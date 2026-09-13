using Kgoriwayra.Domain.Common;

namespace Kgoriwayra.Domain.Entities;

public class BlogPost : AuditableEntity
{
    public string Slug { get; set; } = string.Empty;
    public string? CoverImageUrl { get; set; }
    public DateTime? PublishedAtUtc { get; set; }
    public bool IsPublished { get; set; } = false;
    public Guid AuthorUserId { get; set; }
    public int ViewCount { get; set; } = 0;

    public virtual User AuthorUser { get; set; } = null!;
    public virtual ICollection<BlogPostTranslation> Translations { get; set; } = new List<BlogPostTranslation>();
}
