using Kgoriwayra.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Kgoriwayra.Infrastructure.Data.Configurations;

public class BookingRequestConfiguration : IEntityTypeConfiguration<BookingRequest>
{
    public void Configure(EntityTypeBuilder<BookingRequest> builder)
    {
        builder.ToTable("booking_requests");

        builder.HasKey(b => b.Id);

        builder.Property(b => b.BookingCode)
            .IsRequired()
            .HasMaxLength(50);

        builder.HasIndex(b => b.BookingCode)
            .IsUnique();

        builder.Property(b => b.CustomerFullName)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(b => b.CustomerEmail)
            .IsRequired()
            .HasMaxLength(256);

        builder.Property(b => b.CustomerPhone)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(b => b.CustomerCountry)
            .HasMaxLength(100);

        builder.Property(b => b.PreferredLanguage)
            .IsRequired()
            .HasMaxLength(10);

        builder.Property(b => b.HotelOrPickupLocation)
            .HasMaxLength(300);

        builder.Property(b => b.SpecialRequestsOrNotes)
            .HasMaxLength(2000);

        builder.Property(b => b.AdminNotes)
            .HasMaxLength(2000);

        builder.HasIndex(b => b.Status);
        builder.HasIndex(b => b.ServiceDate);
        builder.HasIndex(b => b.CustomerEmail);

        builder.HasOne(b => b.Tour)
            .WithMany(t => t.BookingRequests)
            .HasForeignKey(b => b.TourId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasOne(b => b.Activity)
            .WithMany(a => a.BookingRequests)
            .HasForeignKey(b => b.ActivityId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasMany(b => b.StatusHistory)
            .WithOne(sh => sh.BookingRequest)
            .HasForeignKey(sh => sh.BookingRequestId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
