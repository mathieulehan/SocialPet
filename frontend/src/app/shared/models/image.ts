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
  colors: Color[];
  img?: string[];
  race: string;
  motif: string;
}

export class ImageFromBack {
  id: number;
  sanitizedPath?: SafeResourceUrl;
  user: User;
  colors: Color[];
  race: Race;
  img: string;
  specie: string;
  isOwner: number;
  created_at: Date;
}
