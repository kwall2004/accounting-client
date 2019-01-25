import { NgModule } from '@angular/core';
import {
  MatProgressBarModule,
  MatDialogModule,
  MatButtonModule,
  MatRippleModule,
  MatIconModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';

@NgModule({
  imports: [
    MatProgressBarModule,
    MatDialogModule,
    MatButtonModule,
    MatRippleModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    MatProgressBarModule,
    MatDialogModule,
    MatButtonModule,
    MatRippleModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class AngularMaterialModule { }
