import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule, MatDialogModule } from '@angular/material';

import { TransactionComponent } from './transaction/transaction.component';
import { RecurrenceComponent } from './recurrence/recurrence.component';

@NgModule({
  declarations: [
    TransactionComponent,
    RecurrenceComponent
  ],
  imports: [
    MatProgressBarModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  entryComponents: [
    TransactionComponent,
    RecurrenceComponent
  ],
  exports: [
    TransactionComponent,
    RecurrenceComponent,
    MatProgressBarModule,
    BrowserAnimationsModule,
    MatDialogModule
  ]
})
export class SharedModule { }
