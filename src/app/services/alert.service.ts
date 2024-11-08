import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {AppointmentModel} from "../models/appointment.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private snackBar: MatSnackBar) {
  }
  alert(content: string, action: string, duration: number) {
    let sb = this.snackBar.open(content, action, {
      duration: duration,
      panelClass: ["custom-style"]
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
  }
}
