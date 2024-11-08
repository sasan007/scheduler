import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentCookieService {
  private readonly COOKIE_NAME = 'appointments';

  constructor(private cookieService: CookieService) {

  }

  saveAppointments(appointments: any[]): void {
    const appointmentsJson = JSON.stringify(appointments);
    this.cookieService.set(this.COOKIE_NAME, appointmentsJson, 1);
  }

  getAppointments(): any[] {
    const appointmentsJson = this.cookieService.get(this.COOKIE_NAME);
    return appointmentsJson ? JSON.parse(appointmentsJson) : [];
  }

  clearAppointments(): void {
    this.cookieService.delete(this.COOKIE_NAME);
  }
}
