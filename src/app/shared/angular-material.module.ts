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
  MatNativeDateModule,
  MatTableModule
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
    MatNativeDateModule,
    MatTableModule
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
    MatNativeDateModule,
    MatTableModule
  ]
})
export class AngularMaterialModule { }
