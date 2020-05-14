import { Injectable } from '@angular/core';
import {User} from '../models/user';
import { BehaviorSubject } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL = 'http://localhost:5000/api/auth';
  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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
    this.isLoggedIn.next(false);
  }

  ensureAuthenticated(token): Promise<any> {
    const url = `${this.BASE_URL}/status`;
    const reqHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    const response = this.http.get<any>(url, { headers: reqHeaders }).toPromise();
    response.then(user => {
      this.isLoggedIn.next(user.status === 'success');
    });
    return response;
  }
}
