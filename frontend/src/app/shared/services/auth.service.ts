import { Injectable } from '@angular/core';
import {User} from '../models/user';
import { BehaviorSubject } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) { }

  login(user: User): Promise<any> {
    const url = `${this.BASE_URL}/login`;
    return this.http.post(url, user).toPromise();
  }
  register(user: User): Promise<any> {
    const url = `${this.BASE_URL}/register`;
    return this.http.post(url, user).toPromise();
  }

  public logout() {
    localStorage.removeItem('ACCESS_TOKEN');
  }

  isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  ensureAuthenticated(token): Promise<any> {
    const url = `${this.BASE_URL}/status`;
    const reqHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    return this.http.get(url, { headers: reqHeaders }).toPromise();
  }
}
