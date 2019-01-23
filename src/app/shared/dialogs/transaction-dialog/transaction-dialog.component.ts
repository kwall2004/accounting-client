import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';

import { Transaction } from 'src/app/core/models/transaction';

@Component({
  selector: 'app-transaction-dialog',
  templateUrl: './transaction-dialog.component.html',
  styleUrls: ['./transaction-dialog.component.scss']
})
export class TransactionDialogComponent {
  form = new FormGroup({
    description: new FormControl(''),
    amount: new FormControl('')
  });

  constructor(
    public dialogRef: MatDialogRef<TransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public transaction: Transaction
  ) {
    this.form.patchValue({
      description: transaction.description,
      amount: transaction.amount
    });
  }

  onCloseClick() {
    this.dialogRef.close();
  }
}
