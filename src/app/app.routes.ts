import { Routes } from '@angular/router';
import {AppComponent} from "./app.component";

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'appointment', loadChildren: () => import('./appointment/appointment.module').then(m => m.AppointmentModule) }
];
