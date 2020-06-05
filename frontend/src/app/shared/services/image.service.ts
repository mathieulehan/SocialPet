import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Image, ImageFromBack} from '../models/image';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  saveAnimal(animal: Image): Observable<Image> {
    return this.http.post<Image>(this.baseUrl + 'image', animal);
  }

  getAllImages(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'images');
  }

  getRelatedImages(animal: Image): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'perdu', animal);
  }

  deleteByUserId(userId: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'image/' + userId);
  }

  getImagesByUserId(userId: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'images/' + userId);
  }
}
