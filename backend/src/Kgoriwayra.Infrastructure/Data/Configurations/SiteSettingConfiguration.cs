using Kgoriwayra.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Kgoriwayra.Infrastructure.Data.Configurations;

public class SiteSettingConfiguration : IEntityTypeConfiguration<SiteSetting>
{
    public void Configure(EntityTypeBuilder<SiteSetting> builder)
    {
        builder.ToTable("site_settings");

        builder.HasKey(s => s.Id);

        builder.Property(s => s.Key)
            .IsRequired()
            .HasMaxLength(100);

        builder.HasIndex(s => s.Key)
            .IsUnique();

        builder.Property(s => s.Value)
            .IsRequired()
            .HasColumnType("longtext");

        builder.Property(s => s.Group)
            .IsRequired()
            .HasMaxLength(50);
    }
}
