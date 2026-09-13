using FluentValidation;
using Kgoriwayra.Application.DTOs.Bookings;

namespace Kgoriwayra.Application.Validators;

public class CreateBookingValidator : AbstractValidator<CreateBookingRequestDto>
{
    public CreateBookingValidator()
    {
        RuleFor(x => x.CustomerFullName)
            .NotEmpty().WithMessage("El nombre completo es obligatorio.")
            .MaximumLength(200).WithMessage("El nombre no debe superar los 200 caracteres.");

        RuleFor(x => x.CustomerEmail)
            .NotEmpty().WithMessage("El correo electrónico es obligatorio.")
            .EmailAddress().WithMessage("El correo electrónico no es válido.");

        RuleFor(x => x.CustomerPhone)
            .NotEmpty().WithMessage("El número de teléfono o WhatsApp es obligatorio.")
            .MaximumLength(50).WithMessage("El teléfono no debe exceder 50 caracteres.");

        RuleFor(x => x.ServiceDate)
            .NotEmpty().WithMessage("La fecha del servicio es requerida.")
            .Must(date => date.Date >= DateTime.UtcNow.Date)
            .WithMessage("La fecha del servicio no puede ser en el pasado.");

        RuleFor(x => x.NumberOfParticipants)
            .GreaterThan(0).WithMessage("Debe ingresar al menos 1 participante.")
            .LessThanOrEqualTo(30).WithMessage("Para grupos mayores a 30 participantes, por favor contáctenos directamente por WhatsApp.");

        RuleFor(x => x)
            .Must(x => x.TourId.HasValue || x.ActivityId.HasValue)
            .WithMessage("Debe seleccionar un circuito o una actividad complementaria.");
    }
}
