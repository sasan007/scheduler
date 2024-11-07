import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {MatNativeDateModule} from "@angular/material/core";
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideHttpClient} from "@angular/common/http";
import {importProvidersFrom} from "@angular/core";
import {DatePickerComponent} from "./app/appointment2/date-picker/date-picker.component";

bootstrapApplication(DatePickerComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(MatNativeDateModule)
  ]
}).catch(err => console.error(err));
