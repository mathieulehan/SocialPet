import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class LoginRedirectService implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(): boolean {
    if (localStorage.getItem('ACCESS_TOKEN')) {
      this.auth.ensureAuthenticated(localStorage.getItem('ACCESS_TOKEN')).then(res => {
        console.log(res);
        return false;
      }, err => {
        console.log(err);
        return true;
      });
    } else {
      return true;
    }
  }
}
