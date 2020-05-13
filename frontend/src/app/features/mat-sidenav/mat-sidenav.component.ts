import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-mat-sidenav',
  templateUrl: './mat-sidenav.component.html',
  styleUrls: ['./mat-sidenav.component.scss']
})
export class MatSidenavComponent implements OnInit {
  userIsConnected = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token) {
      this.authService.ensureAuthenticated(token)
        .then((user) => {
          if (user.status === 'success') {
            this.userIsConnected = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

}
