namespace Kgoriwayra.Domain.Common;

public abstract class AuditableEntity<TId> : BaseEntity<TId>, ISoftDeletable
{
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAtUtc { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime? DeletedAtUtc { get; set; }
}

public abstract class AuditableEntity : AuditableEntity<Guid>
{
}
