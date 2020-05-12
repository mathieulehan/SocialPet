import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  saveAnimal(animal: any): Observable<object> {
    return this.http.post('/image', animal);
  }

  getAllImages(): Observable<object> {
    return this.http.get('/images');
  }

  getRelatedImages(animal: any): Observable<object> {
    return this.http.post('/perdu', animal);
  }

}
