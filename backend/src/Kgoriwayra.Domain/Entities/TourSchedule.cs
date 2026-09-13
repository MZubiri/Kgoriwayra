using Kgoriwayra.Domain.Common;

namespace Kgoriwayra.Domain.Entities;

public class TourSchedule : BaseEntity<int>
{
    public Guid TourId { get; set; }
    public TimeSpan DepartureTime { get; set; }
    public string? Label { get; set; } // e.g. "Salida de Mañana", "Salida de Tarde"
    public bool IsActive { get; set; } = true;

    public virtual Tour Tour { get; set; } = null!;
}
