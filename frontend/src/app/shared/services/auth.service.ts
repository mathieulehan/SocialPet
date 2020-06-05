import { Injectable } from '@angular/core';
import {User} from '../models/user';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL = environment.apiUrl + 'auth/';
  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.loadTokenIfExists();
  }

  login(user: User): Promise<any> {
    const url = `${this.BASE_URL}login`;
    return this.http.post(url, user).toPromise();
  }

  register(user: User): Promise<any> {
    const url = `${this.BASE_URL}register`;
    return this.http.post(url, user).toPromise();
  }

  public logout() {
    localStorage.removeItem('ACCESS_TOKEN');
    this.isLoggedIn.next(false);
  }

  async loadTokenIfExists() {
    this.isLoggedIn = new BehaviorSubject<boolean>(await this.ensureAuthenticated(localStorage.getItem('ACCESS_TOKEN')));
  }

  ensureAuthenticated(token): Promise<any> {
    const url = `${this.BASE_URL}status`;
    const reqHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    const response = this.http.get<any>(url, {headers: reqHeaders}).toPromise();
    response.then(user => {
      this.isLoggedIn.next(user.status === 'success');
    });
    return response;
  }

  deleteUserById(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.BASE_URL}/` + userId);
  }
}
