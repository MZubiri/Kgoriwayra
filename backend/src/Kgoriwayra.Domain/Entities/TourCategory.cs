using Kgoriwayra.Domain.Common;

namespace Kgoriwayra.Domain.Entities;

public class TourCategory : AuditableEntity<int>
{
    public string Slug { get; set; } = string.Empty;
    public string NameEs { get; set; } = string.Empty;
    public string NameEn { get; set; } = string.Empty;
    public string? DescriptionEs { get; set; }
    public string? DescriptionEn { get; set; }
    public int SortOrder { get; set; } = 0;
    public bool IsActive { get; set; } = true;

    public virtual ICollection<Tour> Tours { get; set; } = new List<Tour>();
}
