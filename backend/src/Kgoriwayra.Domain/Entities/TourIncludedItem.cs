using Kgoriwayra.Domain.Common;
using Kgoriwayra.Domain.Enums;

namespace Kgoriwayra.Domain.Entities;

public class TourIncludedItem : BaseEntity<int>
{
    public Guid TourId { get; set; }
    public IncludedItemType Type { get; set; }
    public string TextEs { get; set; } = string.Empty;
    public string TextEn { get; set; } = string.Empty;
    public string? IconName { get; set; }
    public int SortOrder { get; set; } = 0;

    public virtual Tour Tour { get; set; } = null!;
}
