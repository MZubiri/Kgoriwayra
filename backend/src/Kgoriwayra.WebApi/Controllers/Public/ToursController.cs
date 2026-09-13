using Kgoriwayra.Application.DTOs.Common;
using Kgoriwayra.Application.DTOs.Tours;
using Kgoriwayra.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Kgoriwayra.WebApi.Controllers.Public;

[ApiController]
[Route("api/[controller]")]
public class ToursController : ControllerBase
{
    private readonly AppDbContext _context;

    public ToursController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<TourSummaryDto>>>> GetTours([FromQuery] string lang = "es")
    {
        lang = lang.ToLowerInvariant() == "en" ? "en" : "es";

        var tours = await _context.Tours
            .AsNoTracking()
            .Where(t => t.IsActive)
            .OrderBy(t => t.SortOrder)
            .Include(t => t.Translations)
            .Include(t => t.Category)
            .ToListAsync();

        var dtos = tours.Select(t =>
        {
            var translation = t.Translations.FirstOrDefault(tr => tr.Language == lang)
                              ?? t.Translations.FirstOrDefault(tr => tr.Language == "es")
                              ?? new Domain.Entities.TourTranslation();

            return new TourSummaryDto
            {
                Id = t.Id,
                Slug = t.Slug,
                Title = translation.Title,
                ShortDescription = translation.ShortDescription,
                Location = t.Location,
                DurationHours = t.DurationHours,
                Difficulty = t.Difficulty.ToString(),
                PricePerPerson = t.PricePerPerson,
                PriceCurrency = t.PriceCurrency,
                CoverImageUrl = t.CoverImageUrl,
                IsFeatured = t.IsFeatured,
                CategoryName = t.Category != null ? (lang == "en" ? t.Category.NameEn : t.Category.NameEs) : null
            };
        }).ToList();

        return Ok(ApiResponse<List<TourSummaryDto>>.Ok(dtos));
    }

    [HttpGet("{slug}")]
    public async Task<ActionResult<ApiResponse<TourDetailDto>>> GetTourBySlug(string slug, [FromQuery] string lang = "es")
    {
        lang = lang.ToLowerInvariant() == "en" ? "en" : "es";

        var tour = await _context.Tours
            .AsNoTracking()
            .Include(t => t.Translations)
            .Include(t => t.Category)
            .Include(t => t.Images.OrderBy(i => i.SortOrder))
            .Include(t => t.ItineraryItems.OrderBy(i => i.StepNumber))
            .Include(t => t.Schedules.Where(s => s.IsActive))
            .Include(t => t.IncludedItems.OrderBy(inc => inc.SortOrder))
            .FirstOrDefaultAsync(t => t.Slug == slug && t.IsActive);

        if (tour == null)
        {
            return NotFound(ApiResponse<TourDetailDto>.Fail($"Circuito '{slug}' no encontrado."));
        }

        var translation = tour.Translations.FirstOrDefault(tr => tr.Language == lang)
                          ?? tour.Translations.FirstOrDefault(tr => tr.Language == "es")
                          ?? new Domain.Entities.TourTranslation();

        var dto = new TourDetailDto
        {
            Id = tour.Id,
            Slug = tour.Slug,
            Title = translation.Title,
            ShortDescription = translation.ShortDescription,
            DetailedDescription = translation.DetailedDescription,
            Location = tour.Location,
            DurationHours = tour.DurationHours,
            Difficulty = tour.Difficulty.ToString(),
            PricePerPerson = tour.PricePerPerson,
            PriceCurrency = tour.PriceCurrency,
            MinAge = tour.MinAge,
            MaxGroupSize = tour.MaxGroupSize,
            MeetingPoint = tour.MeetingPoint,
            MeetingPointDescription = translation.MeetingPointDescription,
            Highlights = translation.Highlights,
            SeoTitle = translation.SeoTitle,
            SeoDescription = translation.SeoDescription,
            CoverImageUrl = tour.CoverImageUrl,
            IsFeatured = tour.IsFeatured,
            CategoryName = tour.Category != null ? (lang == "en" ? tour.Category.NameEn : tour.Category.NameEs) : null,
            Images = tour.Images.Select(i => new TourImageDto
            {
                Id = i.Id,
                ImageUrl = i.ImageUrl,
                AltText = lang == "en" ? i.AltTextEn : i.AltTextEs,
                IsCover = i.IsCover,
                SortOrder = i.SortOrder
            }).ToList(),
            Itinerary = tour.ItineraryItems.Select(it => new TourItineraryItemDto
            {
                StepNumber = it.StepNumber,
                Title = lang == "en" ? it.TitleEn : it.TitleEs,
                Description = lang == "en" ? it.DescriptionEn : it.DescriptionEs,
                DurationText = it.DurationText
            }).ToList(),
            Schedules = tour.Schedules.Select(s => new TourScheduleDto
            {
                DepartureTime = s.DepartureTime.ToString(@"hh\:mm"),
                Label = s.Label
            }).ToList(),
            IncludedItems = tour.IncludedItems.Select(inc => new TourIncludedItemDto
            {
                Id = inc.Id,
                Type = inc.Type.ToString(),
                Text = lang == "en" ? inc.TextEn : inc.TextEs,
                IconName = inc.IconName
            }).ToList()
        };

        return Ok(ApiResponse<TourDetailDto>.Ok(dto));
    }
}
