import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {User} from './user';
import {Color} from './color';
import {Race} from './race';
import {ImageFromBack} from './image';

export class Animal {
  constructor(image: ImageFromBack) {
    this.id = image.id;
    this.sanitizedPaths = [];
    this.user = image.user;
    this.race = image.race;
    this.raceUser = image.raceUser;
    this.specie = image.specie;
    this.isOwner = image.isOwner;
    this.created_at = image.created_at;
  }

  id: number;
  sanitizedPaths: SafeResourceUrl[];
  user: User;
  colors: Color[];
  race: Race;
  raceUser: Race;
  specie: string;
  isOwner: number;
  created_at: Date;

  public addImage(img: string, sanitizer: DomSanitizer, base64Str: string) {
    this.sanitizedPaths.push(sanitizer.bypassSecurityTrustResourceUrl(base64Str + img));
  }

}
