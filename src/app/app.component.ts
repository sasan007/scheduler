import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {DatePickerComponent} from "./appointment/date-picker/date-picker.component";
import {MatButtonToggle} from "@angular/material/button-toggle";
import {MatIcon} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DatePickerComponent, MatButtonToggle, MatIcon, MatButtonModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
