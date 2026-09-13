using Kgoriwayra.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Kgoriwayra.Infrastructure.Data.Configurations;

public class TourTranslationConfiguration : IEntityTypeConfiguration<TourTranslation>
{
    public void Configure(EntityTypeBuilder<TourTranslation> builder)
    {
        builder.ToTable("tour_translations");

        builder.HasKey(tr => tr.Id);

        builder.Property(tr => tr.Language)
            .IsRequired()
            .HasMaxLength(10);

        builder.Property(tr => tr.Title)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(tr => tr.ShortDescription)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(tr => tr.DetailedDescription)
            .IsRequired()
            .HasColumnType("longtext");

        builder.Property(tr => tr.Highlights)
            .HasColumnType("longtext");

        builder.Property(tr => tr.SeoTitle)
            .HasMaxLength(200);

        builder.Property(tr => tr.SeoDescription)
            .HasMaxLength(320);

        builder.HasIndex(tr => new { tr.TourId, tr.Language })
            .IsUnique();
    }
}
