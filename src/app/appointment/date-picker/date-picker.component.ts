import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  model,
  Renderer2,
  signal,
  ViewChild
} from '@angular/core';
import {MatCalendar, MatDatepickerModule} from "@angular/material/datepicker";
import {MatCard, MatCardModule} from "@angular/material/card";
import {provideNativeDateAdapter} from "@angular/material/core";
import {TimeLineComponent} from "../time-line/time-line.component";
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent} from "@angular/material/dialog";
import {MatFormField} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {DialogOverviewExampleDialog} from "./appointment-form/appointment-form.component";

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [
    MatCalendar,
    MatCard,
    MatCardModule,
    MatDatepickerModule,
    TimeLineComponent,
    MatFabButton,
    MatIcon,
    MatDialogContent,
    MatFormField,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css'
})
export class DatePickerComponent {
  // @ts-ignore
  @ViewChild('parent', { static: true }) parent: ElementRef;
  selected = model<Date | null>(null);
  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);
  constructor(private renderer: Renderer2) {
  }
  addDraggable() {
    const div = this.renderer.createElement('div');
    this.renderer.addClass(div, 'example-box');
    this.renderer.addClass(div, 'cdkDrag');
    const text = this.renderer.createText('Drag me around');
    this.renderer.appendChild(div, text);
    this.renderer.appendChild(this.parent.nativeElement, div);
  }
  openDialog(): void {
    this.addDraggable();
    // const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
    //   data: {name: this.name(), animal: this.animal()},
    // });
    //
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   if (result !== undefined) {
    //     this.animal.set(result);
    //   }
    // });
  }
}

