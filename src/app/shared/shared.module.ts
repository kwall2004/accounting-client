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
    BrowserAnimationsModule,
    MatDialogModule
  ],
  entryComponents: [
    TransactionComponent
  ],
  exports: [
    TransactionComponent,
    MatProgressBarModule,
    BrowserAnimationsModule,
    MatDialogModule
  ]
})
export class SharedModule { }
