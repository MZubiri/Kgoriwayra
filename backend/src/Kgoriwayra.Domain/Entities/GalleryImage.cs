using Kgoriwayra.Domain.Common;

namespace Kgoriwayra.Domain.Entities;

public class GalleryImage : AuditableEntity
{
    public string ImageUrl { get; set; } = string.Empty;
    public string? CaptionEs { get; set; }
    public string? CaptionEn { get; set; }
    public string? Category { get; set; } // e.g. "caballos", "paisajes", "rutas"
    public int SortOrder { get; set; } = 0;
    public bool IsActive { get; set; } = true;
}
