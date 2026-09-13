using Kgoriwayra.Domain.Common;

namespace Kgoriwayra.Domain.Entities;

public class AuditLog : BaseEntity<long>
{
    public Guid? UserId { get; set; }
    public string UserEmail { get; set; } = string.Empty;
    public string Action { get; set; } = string.Empty; // "CREATE", "UPDATE", "DELETE", "LOGIN", "STATUS_CHANGE"
    public string EntityName { get; set; } = string.Empty; // "Tour", "BookingRequest", "User"
    public string? EntityId { get; set; }
    public string? Details { get; set; }
    public string? IpAddress { get; set; }
    public DateTime TimestampUtc { get; set; } = DateTime.UtcNow;

    public virtual User? User { get; set; }
}
