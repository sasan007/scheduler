import {AppointmentModel} from "./appointment.model";

export interface AppointmentCalendarCard extends AppointmentModel {
  id: string;
  left: number;
  top: number;
}
