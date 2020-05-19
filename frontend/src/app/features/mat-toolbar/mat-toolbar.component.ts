import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {SnackBarAbleComponent} from '../snack-bar-able/snack-bar-able.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-mat-toolbar',
  templateUrl: './mat-toolbar.component.html',
  styleUrls: ['./mat-toolbar.component.scss']
})
export class MatToolbarComponent extends SnackBarAbleComponent implements OnInit {
  userIsConnected = false;

  constructor(private authService: AuthService, dialog: MatDialog, snackBar: MatSnackBar) {
    super(snackBar, dialog);
    this.authService.isLoggedIn.subscribe(value => {
      this.userIsConnected = value;
    });
  }

  ngOnInit(): void {}

  logOut() {
    this.showSpinner();
    this.authService.logout();
    this.authService.loadTokenIfExists().then();
    this.hideSpinner();
  }
}
