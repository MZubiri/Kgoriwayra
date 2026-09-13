using System.Net;
using Kgoriwayra.Application.DTOs.Bookings;
using Kgoriwayra.Application.DTOs.Common;
using Kgoriwayra.Application.Validators;
using Kgoriwayra.Domain.Entities;
using Kgoriwayra.Domain.Enums;
using Kgoriwayra.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Kgoriwayra.WebApi.Controllers.Public;

[ApiController]
[Route("api/[controller]")]
public class BookingsController : ControllerBase
{
    private readonly AppDbContext _context;

    public BookingsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<BookingConfirmationResponseDto>>> CreateBooking(
        [FromBody] CreateBookingRequestDto request,
        [FromQuery] string lang = "es")
    {
        var validator = new CreateBookingValidator();
        var validationResult = await validator.ValidateAsync(request);
        if (!validationResult.IsValid)
        {
            var errors = validationResult.Errors.Select(e => e.ErrorMessage).ToList();
            return BadRequest(ApiResponse<BookingConfirmationResponseDto>.Fail("Error de validación en la solicitud de reserva.", errors));
        }

        string itemTitle = "Cabalgata en el Colca";
        if (request.TourId.HasValue)
        {
            var tour = await _context.Tours
                .Include(t => t.Translations)
                .FirstOrDefaultAsync(t => t.Id == request.TourId.Value);

            if (tour != null)
            {
                var tr = tour.Translations.FirstOrDefault(t => t.Language == lang) ?? tour.Translations.FirstOrDefault();
                if (tr != null) itemTitle = tr.Title;
            }
        }
        else if (request.ActivityId.HasValue)
        {
            var activity = await _context.Activities
                .Include(a => a.Translations)
                .FirstOrDefaultAsync(a => a.Id == request.ActivityId.Value);

            if (activity != null)
            {
                var tr = activity.Translations.FirstOrDefault(t => t.Language == lang) ?? activity.Translations.FirstOrDefault();
                if (tr != null) itemTitle = tr.Title;
            }
        }

        // Generate unique code: KGW-YYYYMMDD-COUNT
        var today = DateTime.UtcNow.ToString("yyyyMMdd");
        var countToday = await _context.BookingRequests
            .CountAsync(b => b.CreatedAtUtc.Date == DateTime.UtcNow.Date);
        var bookingCode = $"KGW-{today}-{(countToday + 1):D3}";

        var booking = new BookingRequest
        {
            BookingCode = bookingCode,
            TourId = request.TourId,
            ActivityId = request.ActivityId,
            CustomerFullName = request.CustomerFullName.Trim(),
            CustomerEmail = request.CustomerEmail.Trim().ToLowerInvariant(),
            CustomerPhone = request.CustomerPhone.Trim(),
            CustomerCountry = request.CustomerCountry?.Trim(),
            PreferredLanguage = lang,
            ServiceDate = request.ServiceDate.Date,
            NumberOfParticipants = request.NumberOfParticipants,
            HotelOrPickupLocation = request.HotelOrPickupLocation?.Trim(),
            SpecialRequestsOrNotes = request.SpecialRequestsOrNotes?.Trim(),
            Status = BookingStatus.Pending,
            UtmSource = request.UtmSource,
            UtmMedium = request.UtmMedium,
            UtmCampaign = request.UtmCampaign,
            IpAddress = HttpContext.Connection.RemoteIpAddress?.ToString(),
            CreatedAtUtc = DateTime.UtcNow
        };

        booking.StatusHistory.Add(new BookingStatusHistory
        {
            PreviousStatus = BookingStatus.Pending,
            NewStatus = BookingStatus.Pending,
            Note = "Solicitud creada desde el sitio web.",
            ChangedAtUtc = DateTime.UtcNow
        });

        await _context.BookingRequests.AddAsync(booking);
        await _context.SaveChangesAsync();

        // Retrieve WhatsApp phone from site settings or default
        var whatsappSetting = await _context.SiteSettings.FirstOrDefaultAsync(s => s.Key == "WhatsAppNumber");
        var phone = whatsappSetting?.Value ?? "51995800077";

        var waMessage = $"*Solicitud de Reserva: {bookingCode}*\n" +
                        $"*Nombre:* {booking.CustomerFullName}\n" +
                        $"*Circuito:* {itemTitle}\n" +
                        $"*Fecha:* {booking.ServiceDate:dd/MM/yyyy}\n" +
                        $"*Personas:* {booking.NumberOfParticipants}\n" +
                        (string.IsNullOrWhiteSpace(booking.HotelOrPickupLocation) ? "" : $"*Hotel:* {booking.HotelOrPickupLocation}\n") +
                        $"¡Hola! Acabo de enviar mi solicitud desde la web y deseo confirmar la disponibilidad.";

        var waUrl = $"https://wa.me/{phone}?text={WebUtility.UrlEncode(waMessage)}";

        var response = new BookingConfirmationResponseDto
        {
            BookingCode = booking.BookingCode,
            Status = booking.Status.ToString(),
            CustomerFullName = booking.CustomerFullName,
            TourOrActivityTitle = itemTitle,
            ServiceDate = booking.ServiceDate,
            NumberOfParticipants = booking.NumberOfParticipants,
            WhatsAppRedirectUrl = waUrl,
            CreatedAtUtc = booking.CreatedAtUtc
        };

        return CreatedAtAction(nameof(CreateBooking), ApiResponse<BookingConfirmationResponseDto>.Ok(response, "Solicitud de reserva registrada con éxito."));
    }
}
