using Kgoriwayra.Domain.Common;

namespace Kgoriwayra.Domain.Entities;

public class RefreshToken : BaseEntity<int>
{
    public string Token { get; set; } = string.Empty;
    public Guid UserId { get; set; }
    public DateTime ExpiresAtUtc { get; set; }
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
    public DateTime? RevokedAtUtc { get; set; }
    public string? ReplacedByToken { get; set; }

    public bool IsExpired => DateTime.UtcNow >= ExpiresAtUtc;
    public bool IsRevoked => RevokedAtUtc != null;
    public bool IsActive => !IsRevoked && !IsExpired;

    public virtual User User { get; set; } = null!;
}
