using Kgoriwayra.Domain.Common;

namespace Kgoriwayra.Domain.Entities;

public class Activity : AuditableEntity
{
    public string Slug { get; set; } = string.Empty;
    public string? CoverImageUrl { get; set; }
    public int SortOrder { get; set; } = 0;
    public bool IsActive { get; set; } = true;
    public decimal? ReferencePrice { get; set; }

    public virtual ICollection<ActivityTranslation> Translations { get; set; } = new List<ActivityTranslation>();
    public virtual ICollection<BookingRequest> BookingRequests { get; set; } = new List<BookingRequest>();
}
