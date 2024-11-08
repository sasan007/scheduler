import {ChangeDetectorRef, Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {CdkDrag, CdkDragEnd} from "@angular/cdk/drag-drop";
import {Subscription} from "rxjs";
import {AppointmentCallService} from "../../services/appointment-call.service";
import {AppointmentCalendarCard} from "../../models/appointment-calendar-card.model";
import {AppointmentCookieService} from "../../services/appointment-cookie.service";
import {CalendarToolsService} from "../../services/calendar-tools.service";
import {AlertService} from "../../services/alert.service";

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
  hours: number[] = Array.from({length: 24}, (_, i) => i);
  showContextMenu = false;
  contextMenuPosition = {x: 0, y: 0};
  selectedItemId: number | null = null;
  minutesDifference = (time1: string, time2: string) => (Number(time2.split(":")[0]) * 60 + Number(time2.split(":")[1])) - (Number(time1.split(":")[0]) * 60 + Number(time1.split(":")[1]));

  appointments: AppointmentCalendarCard[] = [];

  constructor(private appointmentCallService: AppointmentCallService,
              private cookieService: AppointmentCookieService,
              private calendarToolsService: CalendarToolsService,
              private alertService: AlertService,
              private cdRef: ChangeDetectorRef) {
    if (cookieService.getAppointments().length > 0) {
      this.appointments = cookieService.getAppointments().map(appointment => {
        appointment.top = this.calendarToolsService.startCardPoint(appointment.startTime);
        appointment.left = 60;
        return appointment;
      });
    }
  }

  getFilteredAppointments() {
    return this.appointments.filter(appointment => new Date(appointment.date).toDateString() === new Date(this.selectedDate).toDateString());
  }

  ngOnInit() {
    this.subscription = this.appointmentCallService.message$.subscribe((msg) => {
      let isConflict = false;
      for (const appointment of this.getFilteredAppointments()) {
        if (this.calendarToolsService.isOverlapping(msg.startTime, msg.endTime, appointment.startTime, appointment.endTime)) {
          isConflict = true;
          break;
        }
      }
      if (isConflict)
        this.alertService.alert("There is an overlap with an existing appointment.", 'Close', 4000);
      else {
        this.appointments.push({
          id: this.appointments.length + 1,
          left: 60,
          top: this.calendarToolsService.startCardPoint(msg.startTime),
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
  ngOnDestroy() {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onRightClick(event: MouseEvent, item: any): void {
    event.preventDefault();
    this.selectedItemId = item.id;
    this.contextMenuPosition = {x: event.clientX, y: event.clientY};
    this.showContextMenu = true;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(): void {
    if (this.showContextMenu) {
      this.showContextMenu = false;
    }
  }

  deleteItem() {
    if (this.selectedItemId !== null) {
      this.appointments = this.appointments.filter(item => item.id !== this.selectedItemId);
      this.selectedItemId = null;
    }
    this.showContextMenu = false;
    this.cookieService.saveAppointments(this.appointments);
  }

  cdkDragEnded(e: CdkDragEnd, item: any) {
    let isConflict = false;
    for (const appointment of this.getFilteredAppointments().filter(x => x.id != item.id)) {
      if (this.calendarToolsService.isOverlapping(
        this.calendarToolsService.addMinutesToTime(item.startTime, e.distance.y),
        this.calendarToolsService.addMinutesToTime(item.endTime, e.distance.y),
        appointment.startTime,
        appointment.endTime)) {
        isConflict = true;
        break;
      }
    }
    if (isConflict) {
      this.alertService.alert("There is an overlap with an existing appointment.", 'Close', 4000);
      return
    }

    this.appointments = this.appointments.map(appointment => {
      if (appointment.id === item.id) {
        appointment.startTime = this.calendarToolsService.addMinutesToTime(appointment.startTime, e.distance.y);
        appointment.endTime = this.calendarToolsService.addMinutesToTime(appointment.endTime, e.distance.y);
        return appointment;
      }
      return appointment;
    });
    this.cookieService.saveAppointments(this.appointments);
  }
}
