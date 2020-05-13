import { Injectable } from '@angular/core';
import {User} from '../models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(localStorage.getItem('ACCESS_TOKEN') !== null);

  public signIn(userData: User) {
    localStorage.setItem('ACCESS_TOKEN', 'access_token');
    this.isLoggedIn.next(true);
  }

  public logout() {
    localStorage.removeItem('ACCESS_TOKEN');
    this.isLoggedIn.next(false);
  }
}
