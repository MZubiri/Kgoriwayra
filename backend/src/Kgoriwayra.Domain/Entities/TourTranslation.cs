using Kgoriwayra.Domain.Common;

namespace Kgoriwayra.Domain.Entities;

public class TourTranslation : BaseEntity<int>
{
    public Guid TourId { get; set; }
    public string Language { get; set; } = "es"; // "es" or "en"
    public string Title { get; set; } = string.Empty;
    public string ShortDescription { get; set; } = string.Empty;
    public string DetailedDescription { get; set; } = string.Empty;
    public string? Highlights { get; set; }
    public string? MeetingPointDescription { get; set; }
    public string? SeoTitle { get; set; }
    public string? SeoDescription { get; set; }
    public string? SeoKeywords { get; set; }

    public virtual Tour Tour { get; set; } = null!;
}
