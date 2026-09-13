using Kgoriwayra.Domain.Common;
using Kgoriwayra.Domain.Enums;

namespace Kgoriwayra.Domain.Entities;

public class Tour : AuditableEntity
{
    public string Slug { get; set; } = string.Empty;
    public decimal? DurationHours { get; set; }
    public DifficultyLevel Difficulty { get; set; } = DifficultyLevel.Easy;
    public int? MinAge { get; set; }
    public int? MaxGroupSize { get; set; }
    public decimal? PricePerPerson { get; set; }
    public string PriceCurrency { get; set; } = "PEN";
    public string Location { get; set; } = "Yanque";
    public string? MeetingPoint { get; set; }
    public bool IsFeatured { get; set; } = false;
    public int SortOrder { get; set; } = 0;
    public bool IsActive { get; set; } = true;
    public int? CategoryId { get; set; }
    public string? CoverImageUrl { get; set; }

    public virtual TourCategory? Category { get; set; }
    public virtual ICollection<TourTranslation> Translations { get; set; } = new List<TourTranslation>();
    public virtual ICollection<TourImage> Images { get; set; } = new List<TourImage>();
    public virtual ICollection<TourItineraryItem> ItineraryItems { get; set; } = new List<TourItineraryItem>();
    public virtual ICollection<TourSchedule> Schedules { get; set; } = new List<TourSchedule>();
    public virtual ICollection<TourIncludedItem> IncludedItems { get; set; } = new List<TourIncludedItem>();
    public virtual ICollection<BookingRequest> BookingRequests { get; set; } = new List<BookingRequest>();
}
