namespace Kgoriwayra.Application.DTOs.Bookings;

public class CreateBookingRequestDto
{
    public Guid? TourId { get; set; }
    public Guid? ActivityId { get; set; }
    public string CustomerFullName { get; set; } = string.Empty;
    public string CustomerEmail { get; set; } = string.Empty;
    public string CustomerPhone { get; set; } = string.Empty;
    public string? CustomerCountry { get; set; }
    public string PreferredLanguage { get; set; } = "es";
    public DateTime ServiceDate { get; set; }
    public string? PreferredTime { get; set; }
    public int NumberOfParticipants { get; set; } = 1;
    public string? HotelOrPickupLocation { get; set; }
    public string? SpecialRequestsOrNotes { get; set; }
    public string? UtmSource { get; set; }
    public string? UtmMedium { get; set; }
    public string? UtmCampaign { get; set; }
}

public class BookingConfirmationResponseDto
{
    public string BookingCode { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string CustomerFullName { get; set; } = string.Empty;
    public string TourOrActivityTitle { get; set; } = string.Empty;
    public DateTime ServiceDate { get; set; }
    public int NumberOfParticipants { get; set; }
    public string WhatsAppRedirectUrl { get; set; } = string.Empty;
    public DateTime CreatedAtUtc { get; set; }
}

public class BookingSummaryAdminDto
{
    public Guid Id { get; set; }
    public string BookingCode { get; set; } = string.Empty;
    public string CustomerFullName { get; set; } = string.Empty;
    public string CustomerEmail { get; set; } = string.Empty;
    public string CustomerPhone { get; set; } = string.Empty;
    public string? TourTitle { get; set; }
    public DateTime ServiceDate { get; set; }
    public int NumberOfParticipants { get; set; }
    public string Status { get; set; } = string.Empty;
    public DateTime CreatedAtUtc { get; set; }
}
