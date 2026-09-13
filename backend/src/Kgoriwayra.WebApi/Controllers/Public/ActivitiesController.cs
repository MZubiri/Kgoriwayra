using Kgoriwayra.Application.DTOs.Common;
using Kgoriwayra.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Kgoriwayra.WebApi.Controllers.Public;

[ApiController]
[Route("api/[controller]")]
public class ActivitiesController : ControllerBase
{
    private readonly AppDbContext _context;

    public ActivitiesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<ActivityDto>>>> GetActivities([FromQuery] string lang = "es")
    {
        lang = lang.ToLowerInvariant() == "en" ? "en" : "es";

        var activities = await _context.Activities
            .AsNoTracking()
            .Where(a => a.IsActive)
            .OrderBy(a => a.SortOrder)
            .Include(a => a.Translations)
            .ToListAsync();

        var dtos = activities.Select(a =>
        {
            var tr = a.Translations.FirstOrDefault(t => t.Language == lang)
                     ?? a.Translations.FirstOrDefault(t => t.Language == "es");

            return new ActivityDto
            {
                Id = a.Id,
                Slug = a.Slug,
                Title = tr?.Title ?? a.Slug,
                ShortDescription = tr?.ShortDescription ?? string.Empty,
                DetailedDescription = tr?.DetailedDescription,
                ImageUrl = a.CoverImageUrl
            };
        }).ToList();

        return Ok(ApiResponse<List<ActivityDto>>.Ok(dtos));
    }
}

public class ActivityDto
{
    public Guid Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string ShortDescription { get; set; } = string.Empty;
    public string? DetailedDescription { get; set; }
    public string? ImageUrl { get; set; }
}
