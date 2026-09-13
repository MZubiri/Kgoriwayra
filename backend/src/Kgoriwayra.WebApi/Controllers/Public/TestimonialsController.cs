using Kgoriwayra.Application.DTOs.Common;
using Kgoriwayra.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Kgoriwayra.WebApi.Controllers.Public;

[ApiController]
[Route("api/[controller]")]
public class TestimonialsController : ControllerBase
{
    private readonly AppDbContext _context;

    public TestimonialsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<TestimonialDto>>>> GetTestimonials([FromQuery] string lang = "es")
    {
        lang = lang.ToLowerInvariant() == "en" ? "en" : "es";

        var testimonials = await _context.Testimonials
            .AsNoTracking()
            .Where(t => t.IsActive)
            .OrderBy(t => t.SortOrder)
            .ToListAsync();

        var dtos = testimonials.Select(t => new TestimonialDto
        {
            Id = t.Id,
            AuthorName = t.AuthorName,
            AuthorLocation = t.AuthorLocation,
            Rating = t.Rating,
            TourName = t.TourName,
            AvatarUrl = t.AvatarUrl,
            Content = (lang == "en" && !string.IsNullOrWhiteSpace(t.ContentEn)) ? t.ContentEn : t.ContentEs
        }).ToList();

        return Ok(ApiResponse<List<TestimonialDto>>.Ok(dtos));
    }
}

public class TestimonialDto
{
    public Guid Id { get; set; }
    public string AuthorName { get; set; } = string.Empty;
    public string? AuthorLocation { get; set; }
    public int Rating { get; set; } = 5;
    public string? TourName { get; set; }
    public string? AvatarUrl { get; set; }
    public string Content { get; set; } = string.Empty;
}
