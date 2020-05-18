import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ProgressSpinnerDialogComponent} from '../progress-spinner-dialog/progress-spinner-dialog-component';

@Component({
  selector: 'app-snack-bar-able',
  templateUrl: './snack-bar-able.component.html',
  styleUrls: ['./snack-bar-able.component.scss']
})
export class SnackBarAbleComponent implements OnInit {
  dialogRef: MatDialogRef<ProgressSpinnerDialogComponent>;

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  showSpinner() {
    this.dialogRef = this.dialog.open(ProgressSpinnerDialogComponent, {
      panelClass: 'transparent',
      disableClose: true
  });
  }

  hideSpinner() {
    this.dialogRef.close();
  }

}
