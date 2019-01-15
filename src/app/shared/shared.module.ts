import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
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
    AngularMaterialModule,
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
    AngularMaterialModule,
    ToastrModule,
    TransactionComponent,
    RecurrenceComponent,
    CaptureConfirmationComponent,
  ]
})
export class SharedModule { }
