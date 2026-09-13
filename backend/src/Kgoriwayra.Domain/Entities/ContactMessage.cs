using Kgoriwayra.Domain.Common;

namespace Kgoriwayra.Domain.Entities;

public class ContactMessage : AuditableEntity
{
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public string Subject { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public bool IsRead { get; set; } = false;
    public bool IsReplied { get; set; } = false;
    public string? ReplyNotes { get; set; }
    public string? IpAddress { get; set; }
}
