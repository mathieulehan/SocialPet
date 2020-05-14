import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-mat-sidenav',
  templateUrl: './mat-sidenav.component.html',
  styleUrls: ['./mat-sidenav.component.scss']
})
export class MatSidenavComponent implements OnInit {
  userIsConnected = false;

  constructor(private authService: AuthService) {
    this.authService.isLoggedIn.subscribe(value => {
      this.userIsConnected = value;
    });
  }

  ngOnInit(): void {}

}
