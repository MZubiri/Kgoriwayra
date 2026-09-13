using Kgoriwayra.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Kgoriwayra.Infrastructure.Data.Configurations;

public class TourConfiguration : IEntityTypeConfiguration<Tour>
{
    public void Configure(EntityTypeBuilder<Tour> builder)
    {
        builder.ToTable("tours");

        builder.HasKey(t => t.Id);

        builder.Property(t => t.Slug)
            .IsRequired()
            .HasMaxLength(150);

        builder.HasIndex(t => t.Slug)
            .IsUnique();

        builder.Property(t => t.Location)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(t => t.PricePerPerson)
            .HasPrecision(10, 2);

        builder.Property(t => t.DurationHours)
            .HasPrecision(4, 2);

        builder.HasOne(t => t.Category)
            .WithMany(c => c.Tours)
            .HasForeignKey(t => t.CategoryId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasMany(t => t.Translations)
            .WithOne(tr => tr.Tour)
            .HasForeignKey(tr => tr.TourId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(t => t.Images)
            .WithOne(img => img.Tour)
            .HasForeignKey(img => img.TourId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(t => t.ItineraryItems)
            .WithOne(it => it.Tour)
            .HasForeignKey(it => it.TourId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(t => t.Schedules)
            .WithOne(s => s.Tour)
            .HasForeignKey(s => s.TourId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(t => t.IncludedItems)
            .WithOne(inc => inc.Tour)
            .HasForeignKey(inc => inc.TourId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
