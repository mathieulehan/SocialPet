import { Component, OnInit } from '@angular/core';
import {ImageService} from '../../shared/services/image.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Image} from '../../shared/models/image';
import {MatDialog} from '@angular/material/dialog';
import {SnackBarAbleComponent} from '../snack-bar-able/snack-bar-able.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-show-all-images',
  templateUrl: './show-all-images.component.html',
  styleUrls: ['./show-all-images.component.scss']
})
export class ShowAllImagesComponent extends SnackBarAbleComponent implements OnInit {
  imagesData: Image[];
  base64Str = 'data:image/jpg;base64,';

  constructor(private imageService: ImageService, private sanitizer: DomSanitizer, dialog: MatDialog, snackBar: MatSnackBar) {
    super(snackBar, dialog);
  }

  ngOnInit(): void {
    this.showSpinner();
    this.imageService.getAllImages().subscribe(res => {
      this.imagesData = res;
      console.log(this.imagesData);
      this.sanitizeImages();
      this.hideSpinner();
      console.log(this.imagesData);
      },
      error => {
        this.hideSpinner();
        this.openSnackBar(error.toString(), 'Oups');
      });
  }

  private sanitizeImages() {
    this.imagesData.forEach(
      image => image.images.forEach(
      imageData => image.sanitizedPath.push(this.sanitizer.bypassSecurityTrustResourceUrl(this.base64Str + imageData))
      )
    );
  }
}
