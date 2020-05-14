import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ProgressSpinnerDialogComponent} from '../progress-spinner-dialog/progress-spinner-dialog-component';

@Component({
  selector: 'app-mat-toolbar',
  templateUrl: './mat-toolbar.component.html',
  styleUrls: ['./mat-toolbar.component.scss']
})
export class MatToolbarComponent implements OnInit {
  userIsConnected = false;

  constructor(private authService: AuthService, private dialog: MatDialog) {
    this.authService.isLoggedIn.subscribe(value => {
      this.userIsConnected = value;
    });
  }

  ngOnInit(): void {}

  logOut() {
    const dialogRef: MatDialogRef<ProgressSpinnerDialogComponent> = this.dialog.open(ProgressSpinnerDialogComponent, {
      panelClass: 'transparent',
      disableClose: true
    });
    this.authService.logout();
    dialogRef.close();
  }
}
