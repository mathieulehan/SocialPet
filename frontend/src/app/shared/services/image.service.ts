import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Image, ImageList} from '../image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  baseUrl = 'http://localhost:5000/api/';
  constructor(private http: HttpClient) { }

  saveAnimal(animal: Image): Observable<object> {
    return this.http.post(this.baseUrl + 'image', animal);
  }

  getAllImages(): Observable<ImageList> {
    return this.http.get<ImageList>(this.baseUrl + 'images');
  }

  getRelatedImages(animal: any): Observable<object> {
    return this.http.post(this.baseUrl + 'perdu', animal);
  }

}
