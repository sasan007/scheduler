// message.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {AppointmentModel} from "../appointment/date-picker/appointment.model";

@Injectable({
  providedIn: 'root'
})
export class AppointmentCallService {
  private messageSubject = new Subject<AppointmentModel>();

  message$ = this.messageSubject.asObservable();

  sendMessage(appointmentModel: AppointmentModel) {
    this.messageSubject.next(appointmentModel);
  }
}
