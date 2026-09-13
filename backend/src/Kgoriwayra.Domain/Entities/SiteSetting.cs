using Kgoriwayra.Domain.Common;

namespace Kgoriwayra.Domain.Entities;

public class SiteSetting : BaseEntity<int>
{
    public string Key { get; set; } = string.Empty; // e.g. "ContactPhone1", "WhatsAppNumber", "BusinessHours"
    public string Value { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string Group { get; set; } = "General"; // "Contact", "Social", "SEO", "General"
    public DateTime UpdatedAtUtc { get; set; } = DateTime.UtcNow;
}
