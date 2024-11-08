import {ChangeDetectorRef, Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {CdkDrag, CdkDragEnd, CdkDragMove} from "@angular/cdk/drag-drop";
import {Subscription} from "rxjs";
import {AppointmentCallService} from "../services/appointment-call.service";
import {AppointmentCalendarCard} from "./appointment-calendar-card.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AppointmentCookieService} from "../../services/appointment-cookie.service";

@Component({
  selector: 'app-time-line',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    MatIcon,
    MatButtonModule,
    CdkDrag,
    NgStyle
  ],
  templateUrl: './time-line.component.html',
  styleUrl: './time-line.component.css'
})
export class TimeLineComponent implements OnInit, OnDestroy {
  @Input('selectedDate') selectedDate: Date = new Date();
  private subscription!: Subscription;
  hours: number[] = Array.from({length: 24}, (_, i) => i);  // Array for 24-hour slots
  showContextMenu = false;
  contextMenuPosition = {x: 0, y: 0};
  selectedItemId: number | null = null;
  startCardPoint = (time1: string) => (Number(time1.split(':')[0]) * 61) + Number(time1.split(':')[1]);
  minutesDifference = (time1: string, time2: string) => (Number(time2.split(":")[0]) * 60 + Number(time2.split(":")[1])) - (Number(time1.split(":")[0]) * 60 + Number(time1.split(":")[1]));

  appointments: AppointmentCalendarCard[] = [];

  constructor(private appointmentCallService: AppointmentCallService,
              private cookieService: AppointmentCookieService,
              private snackBar: MatSnackBar,
              private cdRef: ChangeDetectorRef) {
    if (cookieService.getAppointments().length > 0) {
      this.appointments = cookieService.getAppointments().map(appointment => {
        appointment.top = this.startCardPoint(appointment.startTime);
        appointment.left = 60;
        return appointment;
      });
    }
  }

  getFilteredAppointments() {
    let asdfasd = this.appointments.filter(appointment => new Date(appointment.date).toDateString() === new Date(this.selectedDate).toDateString());
    return asdfasd;
  }

  ngOnInit() {
    // Subscribe to the message observable
    this.subscription = this.appointmentCallService.message$.subscribe((msg) => {
      let isConflict = false;
      for (const appointment of this.getFilteredAppointments()) {
        if (this.isOverlapping(msg.startTime, msg.endTime, appointment.startTime, appointment.endTime)) {
          isConflict = true;
          break;
        }
      }
      if (isConflict)
        this.alert("There is an overlap with an existing appointment.", 'Close', 4000);
      else {
        this.appointments.push({
          id: this.appointments.length + 1,
          left: 60,
          top: this.startCardPoint(msg.startTime),
          date: msg.date,
          endTime: msg.endTime,
          startTime: msg.startTime,
          title: msg.title
        });
      }
      this.cookieService.saveAppointments(this.appointments);
      this.cdRef.detectChanges();
    });
  }

  private alert(content: string, action: string, duration: number) {
    let sb = this.snackBar.open(content, action, {
      duration: duration,
      panelClass: ["custom-style"]
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
  }

  ngOnDestroy() {
    // Clean up the subscription to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }

  isOverlapping(newStartTime: string, newEndTime: string, existingStartTime: string, existingEndTime: string): boolean {
    const newStart = this.timeToMinutes(newStartTime);
    const newEnd = this.timeToMinutes(newEndTime);
    const existingStart = this.timeToMinutes(existingStartTime);
    const existingEnd = this.timeToMinutes(existingEndTime);

    // Check if the new appointment overlaps with the existing one
    return (newStart < existingEnd && newEnd > existingStart);
  }

  onRightClick(event: MouseEvent, item: any): void {
    event.preventDefault(); // Prevent the default context menu
    this.selectedItemId = item.id; // Store the item ID
    this.contextMenuPosition = {x: event.clientX, y: event.clientY}; // Set the position of the context menu
    this.showContextMenu = true; // Show the context menu
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (this.showContextMenu) {
      this.showContextMenu = false;
    }
  }

  deleteItem() {
    if (this.selectedItemId !== null) {
      this.appointments = this.appointments.filter(item => item.id !== this.selectedItemId);
      this.selectedItemId = null; // Reset selected item ID
    }
    this.showContextMenu = false; // Hide the context menu
    this.cookieService.saveAppointments(this.appointments);
  }

  cdkDragEnded(e: CdkDragEnd, item: any) {
    let isConflict = false;
    for (const appointment of this.getFilteredAppointments().filter(x => x.id != item.id)) {
      if (this.isOverlapping(
        this.addMinutesToTime(item.startTime, e.distance.y),
        this.addMinutesToTime(item.endTime, e.distance.y),
        appointment.startTime,
        appointment.endTime)) {
        isConflict = true;
        break;
      }
    }
    if (isConflict) {
      this.alert("There is an overlap with an existing appointment.", 'Close', 4000);
      return
    }

    this.appointments = this.appointments.map(appointment => {
      if (appointment.id === item.id) {
        appointment.startTime = this.addMinutesToTime(appointment.startTime, e.distance.y);
        appointment.endTime = this.addMinutesToTime(appointment.endTime, e.distance.y);
        return appointment;
      }
      return appointment;
    });
    this.cookieService.saveAppointments(this.appointments);
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
