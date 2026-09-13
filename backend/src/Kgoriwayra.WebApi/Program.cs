using System.Text;
using Kgoriwayra.Infrastructure.Data;
using Kgoriwayra.Infrastructure.Seed;
using Kgoriwayra.WebApi.Middleware;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// 1. Database Configuration (MySQL 8.0 with SQLite local fallback)
var dbProvider = builder.Configuration["DatabaseProvider"] ?? "Sqlite";

if (dbProvider.Equals("MySql", StringComparison.OrdinalIgnoreCase))
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
                           ?? "Server=localhost;Port=3306;Database=kgoriwayra;User=kgoriwayra_dev;Password=dev_password_123;";

    builder.Services.AddDbContext<AppDbContext>(options =>
    {
        options.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 36)), mySqlOptions =>
        {
            mySqlOptions.EnableRetryOnFailure(5, TimeSpan.FromSeconds(10), null);
        });
    });
}
else
{
    var sqliteConnection = builder.Configuration.GetConnectionString("SqliteConnection") ?? "Data Source=kgoriwayra.db";
    builder.Services.AddDbContext<AppDbContext>(options =>
    {
        options.UseSqlite(sqliteConnection);
    });
}

builder.Services.AddScoped<DataSeeder>();

// 2. JWT Authentication
var jwtSecret = builder.Configuration["Jwt:Secret"] ?? "Kgoriwayra_Colca_SuperSecret_Jwt_EncryptionKey_987654321_ABCXYZ";
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"] ?? "api.cabalgataskgoriwayra.com",
        ValidAudience = builder.Configuration["Jwt:Audience"] ?? "cabalgataskgoriwayra.com",
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret)),
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddAuthorization();

// 3. CORS Configuration
var allowedOrigins = builder.Configuration["Cors:AllowedOrigins"]?.Split(',', StringSplitOptions.RemoveEmptyEntries)
                     ?? new[] { "http://localhost:4200", "http://localhost:4000" };

builder.Services.AddCors(options =>
{
    options.AddPolicy("DefaultCorsPolicy", policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// 4. Health Checks
builder.Services.AddHealthChecks();

// 5. Controllers & JSON Options
builder.Services.AddControllers();

// 6. Swagger / OpenAPI Documentation
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Cabalgatas Kgoriwayra API",
        Version = "v1",
        Description = "API RESTful bilingüe para reservas y administración de circuitos turísticos en el Valle y Cañón del Colca."
    });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

var app = builder.Build();

// -------------------------------------------------------------
// Database Migration and Seeding on Startup
// -------------------------------------------------------------
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var logger = services.GetRequiredService<ILogger<Program>>();
    try
    {
        var context = services.GetRequiredService<AppDbContext>();
        // Ensure database exists
        await context.Database.EnsureCreatedAsync();

        var seeder = services.GetRequiredService<DataSeeder>();
        var adminEmail = builder.Configuration["Admin:Email"];
        var adminPass = builder.Configuration["Admin:Password"];
        await seeder.SeedAsync(adminEmail, adminPass);
    }
    catch (Exception ex)
    {
        logger.LogWarning(ex, "Could not automatically migrate or seed database on startup (MySQL may be offline in dev mode).");
    }
}

// -------------------------------------------------------------
// Middleware Pipeline
// -------------------------------------------------------------
app.UseMiddleware<ExceptionHandlingMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Cabalgatas Kgoriwayra API v1");
        c.RoutePrefix = "swagger";
    });
}

app.UseCors("DefaultCorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapHealthChecks("/health");
app.MapControllers();

app.Run();
