import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Image, ImageList} from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  baseUrl = 'http://localhost:5000/api/';
  constructor(private http: HttpClient) { }

  saveAnimal(animal: Image): Observable<Image> {
    return this.http.post<Image>(this.baseUrl + 'image', animal);
  }

  getAllImages(): Observable<Image[]> {
    return this.http.get<Image[]>(this.baseUrl + 'images');
  }

  getRelatedImages(animal: any): Observable<object> {
    return this.http.post(this.baseUrl + 'perdu', animal);
  }

  deleteByUserId(userId: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'image/' + userId);
  }

  getImagesByUserId(userId: number): Observable<Image> {
    return this.http.get<Image>(this.baseUrl + 'images/' + userId);
  }
}
