import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Recurrence } from '../../../core/models/recurrence';

@Component({
  selector: 'app-recurrence-dialog',
  templateUrl: './recurrence-dialog.component.html',
  styleUrls: ['./recurrence-dialog.component.scss']
})
export class RecurrenceDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<RecurrenceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Recurrence
  ) { }
}
