import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule, MatDialogModule, MatButtonModule, MatRippleModule } from '@angular/material';
import { ToastrModule } from 'ngx-toastr';

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
    MatDialogModule,
    MatButtonModule,
    MatRippleModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-full-width'
    })
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
    MatProgressBarModule,
    MatDialogModule,
    MatButtonModule,
    MatRippleModule,
    ToastrModule
  ]
})
export class SharedModule { }
