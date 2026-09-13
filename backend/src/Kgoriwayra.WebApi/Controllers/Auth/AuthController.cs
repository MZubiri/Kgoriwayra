using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Kgoriwayra.Application.DTOs.Auth;
using Kgoriwayra.Application.DTOs.Common;
using Kgoriwayra.Application.Validators;
using Kgoriwayra.Domain.Entities;
using Kgoriwayra.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Kgoriwayra.WebApi.Controllers.Auth;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;

    public AuthController(AppDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    [HttpPost("login")]
    public async Task<ActionResult<ApiResponse<AuthResponseDto>>> Login([FromBody] LoginRequestDto request)
    {
        var validator = new LoginValidator();
        var validation = await validator.ValidateAsync(request);
        if (!validation.IsValid)
        {
            return BadRequest(ApiResponse<AuthResponseDto>.Fail("Datos de acceso inválidos.", validation.Errors.Select(e => e.ErrorMessage).ToList()));
        }

        var user = await _context.Users
            .Include(u => u.Role)
            .FirstOrDefaultAsync(u => u.Email == request.Email.Trim().ToLowerInvariant() && u.IsActive);

        if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        {
            return Unauthorized(ApiResponse<AuthResponseDto>.Fail("Credenciales incorrectas o usuario deshabilitado."));
        }

        // Generate JWT Access Token
        var tokenSecret = _config["Jwt:Secret"] ?? "Kgoriwayra_Colca_SuperSecret_Jwt_EncryptionKey_987654321_ABCXYZ";
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenSecret));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var expirationMinutes = int.TryParse(_config["Jwt:AccessTokenExpirationMinutes"], out var exp) ? exp : 60;
        var expiresAt = DateTime.UtcNow.AddMinutes(expirationMinutes);

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new(JwtRegisteredClaimNames.Email, user.Email),
            new(ClaimTypes.Name, user.FullName),
            new(ClaimTypes.Role, user.Role.Name)
        };

        var jwtToken = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"] ?? "api.cabalgataskgoriwayra.com",
            audience: _config["Jwt:Audience"] ?? "cabalgataskgoriwayra.com",
            claims: claims,
            expires: expiresAt,
            signingCredentials: creds
        );

        var accessToken = new JwtSecurityTokenHandler().WriteToken(jwtToken);

        // Generate Refresh Token
        var refreshToken = GenerateRefreshToken(user.Id);
        await _context.RefreshTokens.AddAsync(refreshToken);

        user.LastLoginAtUtc = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        var response = new AuthResponseDto
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken.Token,
            ExpiresAtUtc = expiresAt,
            User = new UserProfileDto
            {
                Id = user.Id,
                Email = user.Email,
                FullName = user.FullName,
                Role = user.Role.Name
            }
        };

        return Ok(ApiResponse<AuthResponseDto>.Ok(response, "Inicio de sesión exitoso."));
    }

    private static RefreshToken GenerateRefreshToken(Guid userId)
    {
        var randomBytes = new byte[64];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomBytes);

        return new RefreshToken
        {
            Token = Convert.ToBase64String(randomBytes),
            UserId = userId,
            ExpiresAtUtc = DateTime.UtcNow.AddDays(7),
            CreatedAtUtc = DateTime.UtcNow
        };
    }
}
