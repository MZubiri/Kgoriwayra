using Kgoriwayra.Domain.Common;

namespace Kgoriwayra.Domain.Entities;

public class Faq : AuditableEntity<int>
{
    public string? Category { get; set; } // e.g. "General", "Cabalgatas", "Reservas", "Equipaje"
    public int SortOrder { get; set; } = 0;
    public bool IsActive { get; set; } = true;

    public virtual ICollection<FaqTranslation> Translations { get; set; } = new List<FaqTranslation>();
}
