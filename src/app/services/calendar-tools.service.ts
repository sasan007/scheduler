import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {AppointmentModel} from "../appointment/date-picker/appointment.model";

@Injectable({
  providedIn: 'root'
})
export class CalendarToolsService {
  startCardPoint = (time1: string) => (Number(time1.split(':')[0]) * 61) + Number(time1.split(':')[1]);
  minutesDifference = (time1: string, time2: string) => (Number(time2.split(":")[0]) * 60 + Number(time2.split(":")[1])) - (Number(time1.split(":")[0]) * 60 + Number(time1.split(":")[1]));
  timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }
  isOverlapping(newStartTime: string, newEndTime: string, existingStartTime: string, existingEndTime: string): boolean {
    const newStart = this.timeToMinutes(newStartTime);
    const newEnd = this.timeToMinutes(newEndTime);
    const existingStart = this.timeToMinutes(existingStartTime);
    const existingEnd = this.timeToMinutes(existingEndTime);

    return (newStart < existingEnd && newEnd > existingStart);
  }

  addMinutesToTime(time: string, minutesToAdd: number): string {
    const [hours, minutes] = time.split(':').map(Number);

    const date = new Date();
    date.setHours(hours, minutes);

    date.setMinutes(date.getMinutes() + minutesToAdd);

    const updatedHours = date.getHours().toString().padStart(2, '0');
    const updatedMinutes = date.getMinutes().toString().padStart(2, '0');

    return `${updatedHours}:${updatedMinutes}`;
  }
}
