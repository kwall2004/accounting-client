import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';

import { Recurrence } from '../../../core/models/recurrence';

@Component({
  selector: 'app-recurrence-dialog',
  templateUrl: './recurrence-dialog.component.html',
  styleUrls: ['./recurrence-dialog.component.scss']
})
export class RecurrenceDialogComponent {
  @Output() update = new EventEmitter<Recurrence>();
  @Output() delete = new EventEmitter<Recurrence>();

  form = new FormGroup({
    description: new FormControl(''),
    amount: new FormControl(''),
    weeklyFrequency: new FormControl(),
    weeklyDay: new FormControl(),
    monthlyFrequency: new FormControl(),
    monthlyDate: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl()
  });

  constructor(
    public dialogRef: MatDialogRef<RecurrenceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public recurrence: Recurrence
  ) {
    this.form.patchValue({
      description: recurrence.description,
      amount: recurrence.amount,
      weeklyFrequency: recurrence.weeklyFrequency,
      weeklyDay: recurrence.weeklyDay,
      monthlyFrequency: recurrence.monthlyFrequency,
      monthlyDate: recurrence.monthlyDate,
      startDate: recurrence.startDate,
      endDate: recurrence.endDate
    });
  }

  onSubmit() {
    if (this.form.dirty) {
      this.update.emit({
        ...this.recurrence,
        ...this.form.value
      });
    }
    this.dialogRef.close();
  }

  onDeleteClick() {
    this.delete.emit(this.recurrence);
    this.dialogRef.close();
  }
}
