import {SafeResourceUrl} from '@angular/platform-browser';
import {Color} from './color';
import {Race} from './race';
import {User} from './user';

export class Image {
  id: number;
  images: string[] = [];
  email: string;
  sanitizedPath?: SafeResourceUrl[];
  item: any;
  couleur: string;
  img?: string[];
}

export class ImageFromBack {
  id: number;
  sanitizedPath?: SafeResourceUrl;
  user: User;
  couleur: Color;
  race: Race;
  img: string;
  specie: string;
}
