import {SafeResourceUrl} from '@angular/platform-browser';

export class ImageList {
  images: Image[];
}

export class Image {
  id: number;
  img: string;
  sanitizedPath?: SafeResourceUrl;
}
