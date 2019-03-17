import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material.module';
import { NgxCurrencyModule } from 'ngx-currency';

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
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    NgxCurrencyModule
  ],
  entryComponents: [
    TransactionDialogComponent,
    RecurrenceDialogComponent,
    CaptureMonthDialogComponent
  ],
  exports: [
    AngularMaterialModule,
    NgxCurrencyModule,
    TransactionDialogComponent,
    RecurrenceDialogComponent,
    CaptureMonthDialogComponent
  ]
})
export class SharedModule { }
