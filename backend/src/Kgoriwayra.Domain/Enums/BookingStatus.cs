namespace Kgoriwayra.Domain.Enums;

public enum BookingStatus
{
    Pending = 1,      // Solicitud recién recibida
    Contacted = 2,    // Administrador contactó al cliente por WhatsApp / Teléfono / Correo
    Confirmed = 3,    // Reserva confirmada y agendada
    Cancelled = 4,    // Cancelada por el cliente o por el operador
    Completed = 5,    // Tour finalizado con éxito
    Unavailable = 6   // Fecha u horario sin cupo o no disponible
}
