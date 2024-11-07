import { Component } from '@angular/core';
import {Appointment} from "./appointment.model";
import {NgForOf, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {CdkDrag} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-time-line',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    MatIcon,
    MatButtonModule,
    CdkDrag
  ],
  templateUrl: './time-line.component.html',
  styleUrl: './time-line.component.css'
})
export class TimeLineComponent {
  hours: number[] = Array.from({ length: 24 }, (_, i) => i);  // Array for 24-hour slots

  appointments: Appointment[] = [
    { startTime: 9, endTime: 11, description: 'Morning Meeting' },
    { startTime: 13, endTime: 14, description: 'Lunch with Client' },
    { startTime: 15, endTime: 17, description: 'Project Work' },
  ];

  getAppointmentForHour(hour: number): Appointment | null {
    return this.appointments.find(app => app.startTime <= hour && app.endTime > hour) || null;
  }
}
