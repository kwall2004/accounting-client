import { NgModule } from '@angular/core';
import {
  MatProgressBarModule,
  MatDialogModule,
  MatButtonModule,
  MatRippleModule,
  MatIconModule,
  MatTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    MatProgressBarModule,
    MatDialogModule,
    MatButtonModule,
    MatRippleModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [
    MatProgressBarModule,
    MatDialogModule,
    MatButtonModule,
    MatRippleModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class AngularMaterialModule { }
