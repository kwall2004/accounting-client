import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { TransactionDialogComponent } from './dialogs/transaction-dialog/transaction-dialog.component';
import { RecurrenceDialogComponent } from './dialogs/recurrence-dialog/recurrence-dialog.component';
import { CaptureMonthDialogComponent } from './dialogs/capture-month-dialog/capture-month-dialog.component';

@NgModule({
  declarations: [
    TransactionDialogComponent,
    RecurrenceDialogComponent,
    CaptureMonthDialogComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    TransactionDialogComponent,
    RecurrenceDialogComponent,
    CaptureMonthDialogComponent
  ],
  exports: [
    AngularMaterialModule,
    ReactiveFormsModule,
    TransactionDialogComponent,
    RecurrenceDialogComponent,
    CaptureMonthDialogComponent
  ]
})
export class SharedModule { }
