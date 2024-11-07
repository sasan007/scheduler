import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DatePickerComponent} from "./date-picker/date-picker.component";

const routes: Routes = [
  { path: '', component: DatePickerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
