export interface CreateBookingRequest {
  tourId?: string;
  activityId?: string;
  customerFullName: string;
  customerEmail: string;
  customerPhone: string;
  customerCountry?: string;
  preferredLanguage?: string;
  serviceDate: string; // ISO yyyy-MM-dd
  preferredTime?: string;
  numberOfParticipants: number;
  hotelOrPickupLocation?: string;
  specialRequestsOrNotes?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export interface BookingConfirmationResponse {
  bookingCode: string;
  status: string;
  customerFullName: string;
  tourOrActivityTitle: string;
  serviceDate: string;
  numberOfParticipants: number;
  whatsAppRedirectUrl: string;
  createdAtUtc: string;
}
