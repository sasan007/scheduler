import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  ViewChild
} from '@angular/core';
import {MatCalendar, MatDatepickerModule} from "@angular/material/datepicker";
import {MatCard, MatCardModule} from "@angular/material/card";
import {provideNativeDateAdapter} from "@angular/material/core";
import {TimeLineComponent} from "../time-line/time-line.component";
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent} from "@angular/material/dialog";
import {MatFormField} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgStyle} from "@angular/common";
import {AppointmentFormComponent} from "./appointment-form/appointment-form.component";
import {AppointmentModel} from "../../models/appointment.model";
import {AppointmentCallService} from "../../services/appointment-call.service";

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [
    MatCalendar,
    MatCard,
    MatCardModule,
    MatDatepickerModule,
    TimeLineComponent,
    MatFabButton,
    MatIcon,
    MatDialogContent,
    MatFormField,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
    NgForOf,
    NgStyle,
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css'
})
export class DatePickerComponent {
  @ViewChild('parent', {static: true}) parent!: ElementRef;
  selected = new Date();
  readonly dialog = inject(MatDialog);
  appointmentModel: AppointmentModel;

  constructor(private appointmentCallService: AppointmentCallService) {
    this.appointmentModel = {title: '', startTime: "00:00", endTime: "00:00", date: new Date()};
  }

  openDialog(): void {

    const dialogRef = this.dialog.open(AppointmentFormComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.appointmentModel = {
          date: this.selected,
          endTime: result.endTime,
          startTime: result.startTime,
          title: result.title
        }
        this.appointmentCallService.sendMessage(this.appointmentModel);
        return;
      }
    });
  }
}

