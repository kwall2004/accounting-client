import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Recurrence } from 'src/app/core/models/recurrence';

@Component({
  selector: 'app-recurrence',
  templateUrl: './recurrence.component.html',
  styleUrls: ['./recurrence.component.scss']
})
export class RecurrenceComponent {
  constructor(
    public dialogRef: MatDialogRef<RecurrenceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Recurrence
  ) { }

  onCloseClick() {
    this.dialogRef.close();
  }
}
