import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-mat-toolbar',
  templateUrl: './mat-toolbar.component.html',
  styleUrls: ['./mat-toolbar.component.scss']
})
export class MatToolbarComponent implements OnInit {
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

  logOut() {
    this.authService.logout();
  }
}
