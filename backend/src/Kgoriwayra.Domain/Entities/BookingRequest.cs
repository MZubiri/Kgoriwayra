using Kgoriwayra.Domain.Common;
using Kgoriwayra.Domain.Enums;

namespace Kgoriwayra.Domain.Entities;

public class BookingRequest : AuditableEntity
{
    public string BookingCode { get; set; } = string.Empty; // e.g. KGW-20260913-001
    public Guid? TourId { get; set; }
    public Guid? ActivityId { get; set; }

    public string CustomerFullName { get; set; } = string.Empty;
    public string CustomerEmail { get; set; } = string.Empty;
    public string CustomerPhone { get; set; } = string.Empty;
    public string? CustomerCountry { get; set; }
    public string PreferredLanguage { get; set; } = "es";

    public DateTime ServiceDate { get; set; }
    public TimeSpan? PreferredTime { get; set; }
    public int NumberOfParticipants { get; set; } = 1;
    public string? HotelOrPickupLocation { get; set; }
    public string? SpecialRequestsOrNotes { get; set; }

    public BookingStatus Status { get; set; } = BookingStatus.Pending;
    public string? AdminNotes { get; set; }

    // Marketing & Tracking
    public string? UtmSource { get; set; }
    public string? UtmMedium { get; set; }
    public string? UtmCampaign { get; set; }
    public string? IpAddress { get; set; }

    public virtual Tour? Tour { get; set; }
    public virtual Activity? Activity { get; set; }
    public virtual ICollection<BookingStatusHistory> StatusHistory { get; set; } = new List<BookingStatusHistory>();
}
