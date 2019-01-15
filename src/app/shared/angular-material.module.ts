import { NgModule } from '@angular/core';
import { MatProgressBarModule, MatDialogModule, MatButtonModule, MatRippleModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    MatProgressBarModule,
    MatDialogModule,
    MatButtonModule,
    MatRippleModule,
    MatIconModule
  ],
  exports: [
    MatProgressBarModule,
    MatDialogModule,
    MatButtonModule,
    MatRippleModule,
    MatIconModule
  ]
})
export class AngularMaterialModule { }
