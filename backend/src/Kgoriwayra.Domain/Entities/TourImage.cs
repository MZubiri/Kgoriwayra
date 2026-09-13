using Kgoriwayra.Domain.Common;

namespace Kgoriwayra.Domain.Entities;

public class TourImage : BaseEntity<int>
{
    public Guid TourId { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public string? AltTextEs { get; set; }
    public string? AltTextEn { get; set; }
    public int SortOrder { get; set; } = 0;
    public bool IsCover { get; set; } = false;

    public virtual Tour Tour { get; set; } = null!;
}
