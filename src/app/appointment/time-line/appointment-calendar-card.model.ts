import {AppointmentModel} from "../date-picker/appointment.model";

export interface AppointmentCalendarCard extends AppointmentModel {
  id: number;
  left: number;
  top: number;
}
