import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {User} from '../../shared/models/user';
import {ImageService} from '../../shared/services/image.service';
import {SnackBarAbleComponent} from '../snack-bar-able/snack-bar-able.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Image} from '../../shared/models/image';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-rgpd',
  templateUrl: './rgpd.component.html',
  styleUrls: ['./rgpd.component.scss']
})
export class RgpdComponent extends SnackBarAbleComponent implements OnInit {
  user: User;
  userImages: Image = new Image();
  base64Str = 'data:image/jpg;base64,';

  constructor(private authService: AuthService, private imageService: ImageService,
              dialog: MatDialog, snackBar: MatSnackBar, private sanitizer: DomSanitizer) {
    super(snackBar, dialog);
  }

  ngOnInit(): void {
    this.authService.ensureAuthenticated(localStorage.getItem('ACCESS_TOKEN')).then(response => {
      this.user = response.data;
    });
  }

  deleteUserImages() {
    this.showSpinner();
    this.imageService.deleteByUserId(this.user.user_id).subscribe(res => {
      this.openSnackBar('Nombre d\'images supprimées : ' + res.deletedImagesCount, 'OK');
    });
    this.hideSpinner();
  }

  deleteUserAccount() {
    this.showSpinner();
    this.authService.deleteUserById(this.user.user_id).subscribe(res => {
      if (res.success) {
        this.openSnackBar('Votre compte et images associées ont été supprimés', 'OK');
        this.authService.logout();
      } else {
        this.openSnackBar('Échec lors de la suppression du compte, contactez un administrateur', 'OK');
      }
    });
    this.hideSpinner();
  }

  private sanitizeImages() {
    this.userImages.images.forEach(
      image => this.userImages.sanitizedPath.push(
        this.sanitizer.bypassSecurityTrustResourceUrl(this.base64Str + image)
      )
    );
  }
}
