import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule, MatDialogModule } from '@angular/material';

import { TransactionComponent } from './transaction/transaction.component';
import { RecurrenceComponent } from './recurrence/recurrence.component';
import { CaptureConfirmationComponent } from './capture-confirmation/capture-confirmation.component';

@NgModule({
  declarations: [
    TransactionComponent,
    RecurrenceComponent,
    CaptureConfirmationComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatDialogModule
  ],
  entryComponents: [
    TransactionComponent,
    RecurrenceComponent,
    CaptureConfirmationComponent
  ],
  exports: [
    TransactionComponent,
    RecurrenceComponent,
    CaptureConfirmationComponent,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatDialogModule
  ]
})
export class SharedModule { }
