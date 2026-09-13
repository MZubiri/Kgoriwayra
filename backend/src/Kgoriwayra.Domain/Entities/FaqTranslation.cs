using Kgoriwayra.Domain.Common;

namespace Kgoriwayra.Domain.Entities;

public class FaqTranslation : BaseEntity<int>
{
    public int FaqId { get; set; }
    public string Language { get; set; } = "es";
    public string Question { get; set; } = string.Empty;
    public string Answer { get; set; } = string.Empty;

    public virtual Faq Faq { get; set; } = null!;
}
