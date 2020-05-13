import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-mat-toolbar',
  templateUrl: './mat-toolbar.component.html',
  styleUrls: ['./mat-toolbar.component.scss']
})
export class MatToolbarComponent implements OnInit {
  userIsConnected = false;

  constructor(private authService: AuthService) {
    this.authService.isLoggedIn.subscribe(value => {
      this.userIsConnected = value;
    });
  }

  ngOnInit(): void {
  }

  logOut() {
    this.authService.logout();
  }
}
