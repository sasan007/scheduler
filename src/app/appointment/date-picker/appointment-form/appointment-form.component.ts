import {Component, inject, model, Renderer2} from "@angular/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {close} from "fs";
import {NgIf} from "@angular/common";
import {AppointmentModel} from "../../../models/appointment.model";

@Component({
  templateUrl: 'appointment-form.component.html',
  standalone: true,
  styleUrl: './appointment-form.component.css',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    NgIf,
    ReactiveFormsModule,
  ],
})
export class AppointmentFormComponent {
  readonly dialogRef = inject(MatDialogRef<AppointmentFormComponent>);
  appointmentForm: FormGroup;
  appointmentModel: AppointmentModel;
  constructor(
    private fb: FormBuilder
  ) {
    this.appointmentModel = {title: '', startTime: "07:00", endTime: "08:00", date: new Date()};
    this.appointmentForm = this.fb.group(
      {
        title: [this.appointmentModel.title, Validators.required],
        startTime: [this.appointmentModel.startTime, Validators.required],
        endTime: [this.appointmentModel.endTime, Validators.required]
      },
      {
        validators: [this.timeValidator]
      }
    );
  }
  timeValidator(control: AbstractControl): ValidationErrors | null {
    const startTime = control.get('startTime')?.value;
    const endTime = control.get('endTime')?.value;

    if (startTime && endTime && startTime >= endTime) {
      return { timeInvalid: true };
    }
    return null;
  }
  close(): void {
    this.dialogRef.close();
  }

  add(): void {
    if (this.appointmentForm.valid) {
      this.dialogRef.close(this.appointmentForm.value);
    }
  }
}
