import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { BookingConfirmationResponse, CreateBookingRequest } from '../models/booking.model';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private readonly http = inject(HttpClient);
  private readonly langService = inject(LanguageService);
  private readonly apiUrl = 'http://localhost:8080/api/bookings';

  createBooking(request: CreateBookingRequest): Observable<ApiResponse<BookingConfirmationResponse>> {
    const lang = this.langService.currentLang();
    return this.http.post<ApiResponse<BookingConfirmationResponse>>(`${this.apiUrl}?lang=${lang}`, request);
  }

  getWhatsAppDirectLink(message?: string): string {
    const defaultMsg = this.langService.currentLang() === 'en'
      ? 'Hello Cabalgatas Kgoriwayra, I would like more information about horseback riding tours in the Colca Valley.'
      : 'Hola Cabalgatas Kgoriwayra, deseo información sobre sus cabalgatas en el Colca.';

    const text = encodeURIComponent(message || defaultMsg);
    return `https://wa.me/51995800077?text=${text}`;
  }
}
