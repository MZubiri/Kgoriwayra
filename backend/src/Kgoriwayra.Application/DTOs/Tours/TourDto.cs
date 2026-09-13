namespace Kgoriwayra.Application.DTOs.Tours;

public class TourSummaryDto
{
    public Guid Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string ShortDescription { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public decimal? DurationHours { get; set; }
    public string Difficulty { get; set; } = string.Empty;
    public decimal? PricePerPerson { get; set; }
    public string PriceCurrency { get; set; } = "PEN";
    public string? CoverImageUrl { get; set; }
    public bool IsFeatured { get; set; }
    public string? CategoryName { get; set; }
}

public class TourDetailDto : TourSummaryDto
{
    public string DetailedDescription { get; set; } = string.Empty;
    public int? MinAge { get; set; }
    public int? MaxGroupSize { get; set; }
    public string? MeetingPoint { get; set; }
    public string? MeetingPointDescription { get; set; }
    public string? Highlights { get; set; }
    public string? SeoTitle { get; set; }
    public string? SeoDescription { get; set; }

    public List<TourImageDto> Images { get; set; } = new();
    public List<TourItineraryItemDto> Itinerary { get; set; } = new();
    public List<TourScheduleDto> Schedules { get; set; } = new();
    public List<TourIncludedItemDto> IncludedItems { get; set; } = new();
}

public class TourImageDto
{
    public int Id { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public string? AltText { get; set; }
    public bool IsCover { get; set; }
    public int SortOrder { get; set; }
}

public class TourItineraryItemDto
{
    public int StepNumber { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? DurationText { get; set; }
}

public class TourScheduleDto
{
    public string DepartureTime { get; set; } = string.Empty;
    public string? Label { get; set; }
}

public class TourIncludedItemDto
{
    public int Id { get; set; }
    public string Type { get; set; } = string.Empty;
    public string Text { get; set; } = string.Empty;
    public string? IconName { get; set; }
}
