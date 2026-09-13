using Kgoriwayra.Domain.Common;

namespace Kgoriwayra.Domain.Entities;

public class Role : BaseEntity<int>
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
