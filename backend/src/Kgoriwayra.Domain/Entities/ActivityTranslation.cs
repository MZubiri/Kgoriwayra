using Kgoriwayra.Domain.Common;

namespace Kgoriwayra.Domain.Entities;

public class ActivityTranslation : BaseEntity<int>
{
    public Guid ActivityId { get; set; }
    public string Language { get; set; } = "es";
    public string Title { get; set; } = string.Empty;
    public string ShortDescription { get; set; } = string.Empty;
    public string DetailedDescription { get; set; } = string.Empty;
    public string? SeoTitle { get; set; }
    public string? SeoDescription { get; set; }

    public virtual Activity Activity { get; set; } = null!;
}
