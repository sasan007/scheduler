import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DatePickerComponent} from "./appointment2/date-picker/date-picker.component";
import {MatButtonToggle} from "@angular/material/button-toggle";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DatePickerComponent, MatButtonToggle, MatIcon,MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  btnText: any = "Add Appointment";
}
