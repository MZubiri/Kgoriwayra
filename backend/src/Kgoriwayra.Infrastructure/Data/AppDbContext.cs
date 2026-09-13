using System.Linq.Expressions;
using Kgoriwayra.Domain.Common;
using Kgoriwayra.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Kgoriwayra.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
    public DbSet<Role> Roles => Set<Role>();
    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();
    public DbSet<TourCategory> TourCategories => Set<TourCategory>();
    public DbSet<Tour> Tours => Set<Tour>();
    public DbSet<TourTranslation> TourTranslations => Set<TourTranslation>();
    public DbSet<TourImage> TourImages => Set<TourImage>();
    public DbSet<TourItineraryItem> TourItineraryItems => Set<TourItineraryItem>();
    public DbSet<TourSchedule> TourSchedules => Set<TourSchedule>();
    public DbSet<TourIncludedItem> TourIncludedItems => Set<TourIncludedItem>();
    public DbSet<Activity> Activities => Set<Activity>();
    public DbSet<ActivityTranslation> ActivityTranslations => Set<ActivityTranslation>();
    public DbSet<BookingRequest> BookingRequests => Set<BookingRequest>();
    public DbSet<BookingStatusHistory> BookingStatusHistories => Set<BookingStatusHistory>();
    public DbSet<Testimonial> Testimonials => Set<Testimonial>();
    public DbSet<GalleryImage> GalleryImages => Set<GalleryImage>();
    public DbSet<BlogPost> BlogPosts => Set<BlogPost>();
    public DbSet<BlogPostTranslation> BlogPostTranslations => Set<BlogPostTranslation>();
    public DbSet<Faq> Faqs => Set<Faq>();
    public DbSet<FaqTranslation> FaqTranslations => Set<FaqTranslation>();
    public DbSet<SiteSetting> SiteSettings => Set<SiteSetting>();
    public DbSet<ContactMessage> ContactMessages => Set<ContactMessage>();
    public DbSet<AuditLog> AuditLogs => Set<AuditLog>();
    public DbSet<UploadedFile> UploadedFiles => Set<UploadedFile>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Apply all Fluent API configurations from this assembly
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);

        // Global Soft-Delete query filter
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            if (typeof(ISoftDeletable).IsAssignableFrom(entityType.ClrType))
            {
                var parameter = Expression.Parameter(entityType.ClrType, "p");
                var isDeletedProperty = Expression.Property(parameter, nameof(ISoftDeletable.IsDeleted));
                var compareExpression = Expression.Equal(isDeletedProperty, Expression.Constant(false));
                var lambda = Expression.Lambda(compareExpression, parameter);

                modelBuilder.Entity(entityType.ClrType).HasQueryFilter(lambda);
            }
        }
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        var entries = ChangeTracker.Entries();
        var now = DateTime.UtcNow;

        foreach (var entry in entries)
        {
            if (entry.Entity is ISoftDeletable softDeletable && entry.State == EntityState.Deleted)
            {
                entry.State = EntityState.Modified;
                softDeletable.IsDeleted = true;
                softDeletable.DeletedAtUtc = now;
            }

            if (entry.State == EntityState.Added)
            {
                if (entry.Metadata.FindProperty("CreatedAtUtc") != null)
                {
                    entry.Property("CreatedAtUtc").CurrentValue = now;
                }
            }
            else if (entry.State == EntityState.Modified)
            {
                if (entry.Metadata.FindProperty("UpdatedAtUtc") != null)
                {
                    entry.Property("UpdatedAtUtc").CurrentValue = now;
                }
            }
        }

        return base.SaveChangesAsync(cancellationToken);
    }
}
