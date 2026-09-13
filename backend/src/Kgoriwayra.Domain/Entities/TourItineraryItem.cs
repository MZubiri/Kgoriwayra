using Kgoriwayra.Domain.Common;

namespace Kgoriwayra.Domain.Entities;

public class TourItineraryItem : BaseEntity<int>
{
    public Guid TourId { get; set; }
    public int StepNumber { get; set; }
    public string TitleEs { get; set; } = string.Empty;
    public string TitleEn { get; set; } = string.Empty;
    public string DescriptionEs { get; set; } = string.Empty;
    public string DescriptionEn { get; set; } = string.Empty;
    public string? DurationText { get; set; }

    public virtual Tour Tour { get; set; } = null!;
}
