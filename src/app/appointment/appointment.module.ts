import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentRoutingModule } from './appointment-routing.module';
import {DatePickerComponent} from "./date-picker/date-picker.component";
import {TimeLineComponent} from "./time-line/time-line.component";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    DatePickerComponent,
    TimeLineComponent
  ]
})
export class AppointmentModule { }
