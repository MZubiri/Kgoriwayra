using Kgoriwayra.Domain.Common;

namespace Kgoriwayra.Domain.Entities;

public class UploadedFile : AuditableEntity
{
    public string OriginalFileName { get; set; } = string.Empty;
    public string StoredFileName { get; set; } = string.Empty;
    public string ContentType { get; set; } = string.Empty;
    public long FileSizeBytes { get; set; }
    public string RelativePath { get; set; } = string.Empty;
    public string? PublicUrl { get; set; }
    public Guid? UploadedByUserId { get; set; }

    public virtual User? UploadedByUser { get; set; }
}
