using Kgoriwayra.Domain.Common;

namespace Kgoriwayra.Domain.Entities;

public class Testimonial : AuditableEntity
{
    public string AuthorName { get; set; } = string.Empty;
    public string? AuthorLocation { get; set; } // e.g. "Lima, Perú", "France"
    public string? AvatarUrl { get; set; }
    public string ContentEs { get; set; } = string.Empty;
    public string? ContentEn { get; set; }
    public int Rating { get; set; } = 5;
    public string? TourName { get; set; }
    public DateTime? ReviewDate { get; set; }
    public bool IsFeatured { get; set; } = false;
    public bool IsActive { get; set; } = true;
    public int SortOrder { get; set; } = 0;
}
