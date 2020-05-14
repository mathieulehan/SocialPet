import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class EnsureAuthenticated implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(): boolean {
    if (localStorage.getItem('ACCESS_TOKEN')) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
