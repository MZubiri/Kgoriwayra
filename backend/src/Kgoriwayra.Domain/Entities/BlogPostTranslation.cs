using Kgoriwayra.Domain.Common;

namespace Kgoriwayra.Domain.Entities;

public class BlogPostTranslation : BaseEntity<int>
{
    public Guid BlogPostId { get; set; }
    public string Language { get; set; } = "es";
    public string Title { get; set; } = string.Empty;
    public string Summary { get; set; } = string.Empty;
    public string ContentHtml { get; set; } = string.Empty;
    public string? SeoTitle { get; set; }
    public string? SeoDescription { get; set; }
    public string? SeoKeywords { get; set; }

    public virtual BlogPost BlogPost { get; set; } = null!;
}
