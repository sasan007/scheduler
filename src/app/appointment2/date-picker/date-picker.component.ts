import {ChangeDetectionStrategy, Component, model} from '@angular/core';
import {MatCalendar, MatDatepickerModule} from "@angular/material/datepicker";
import {MatCard, MatCardModule} from "@angular/material/card";
import {RouterOutlet} from "@angular/router";
import {provideNativeDateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-date-picker',
  standalone: true,
    imports: [
        MatCalendar,
        MatCard,
      MatCardModule,
      MatDatepickerModule,
    ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css'
})
export class DatePickerComponent {
  selected = model<Date | null>(null);
}
