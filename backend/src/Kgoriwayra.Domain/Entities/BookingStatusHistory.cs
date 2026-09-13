using Kgoriwayra.Domain.Common;
using Kgoriwayra.Domain.Enums;

namespace Kgoriwayra.Domain.Entities;

public class BookingStatusHistory : BaseEntity<int>
{
    public Guid BookingRequestId { get; set; }
    public BookingStatus PreviousStatus { get; set; }
    public BookingStatus NewStatus { get; set; }
    public string? Note { get; set; }
    public Guid? ChangedByUserId { get; set; }
    public DateTime ChangedAtUtc { get; set; } = DateTime.UtcNow;

    public virtual BookingRequest BookingRequest { get; set; } = null!;
    public virtual User? ChangedByUser { get; set; }
}
