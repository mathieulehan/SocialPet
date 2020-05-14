import { Component, OnInit } from '@angular/core';
import {ImageService} from '../../shared/services/image.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Image} from '../../shared/models/image';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ProgressSpinnerDialogComponent} from '../progress-spinner-dialog/progress-spinner-dialog-component';

@Component({
  selector: 'app-show-all-images',
  templateUrl: './show-all-images.component.html',
  styleUrls: ['./show-all-images.component.scss']
})
export class ShowAllImagesComponent implements OnInit {
  imagesData: Image[];
  base64Str = 'data:image/jpg;base64,';

  constructor(private imageService: ImageService, private sanitizer: DomSanitizer, private dialog: MatDialog) { }

  ngOnInit(): void {
    const dialogRef: MatDialogRef<ProgressSpinnerDialogComponent> = this.dialog.open(ProgressSpinnerDialogComponent, {
      panelClass: 'transparent',
      disableClose: true
    });
    this.imageService.getAllImages().subscribe(res => {
      this.imagesData = res.images;
      this.sanitizeImages();
      dialogRef.close();
      console.log(this.imagesData);
      });
  }

  private sanitizeImages() {
    this.imagesData.forEach(image => image.sanitizedPath = this.sanitizer.bypassSecurityTrustResourceUrl(this.base64Str + image.img));
  }
}
