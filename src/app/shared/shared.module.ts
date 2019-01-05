import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule, MatDialogModule } from '@angular/material';

import { TransactionComponent } from './transaction/transaction.component';

@NgModule({
  declarations: [
    TransactionComponent
  ],
  imports: [
    MatProgressBarModule,
    MatDialogModule
  ],
  entryComponents: [
    TransactionComponent
  ],
  exports: [
    TransactionComponent,
    MatProgressBarModule,
    MatDialogModule
  ]
})
export class SharedModule { }
