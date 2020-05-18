import {SafeResourceUrl} from '@angular/platform-browser';

export class ImageList {
  images: Image[];
}

export class Image {
  id: number;
  images: string[] = [];
  email: string;
  sanitizedPath?: SafeResourceUrl[];
  item: string;
  couleur: string;
}
