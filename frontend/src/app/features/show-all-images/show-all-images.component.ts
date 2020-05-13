import { Component, OnInit } from '@angular/core';
import {ImageService} from '../../shared/services/image.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Image} from '../../shared/models/image';

@Component({
  selector: 'app-show-all-images',
  templateUrl: './show-all-images.component.html',
  styleUrls: ['./show-all-images.component.scss']
})
export class ShowAllImagesComponent implements OnInit {
  imagesData: Image[];

  constructor(private imageService: ImageService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.imageService.getAllImages().subscribe(res => {
      this.imagesData = res.images;
      this.sanitizeImages();
      console.log(this.imagesData);
      });
  }

  private sanitizeImages() {
      this.imagesData.forEach(image => image.sanitizedPath = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + image.img));
  }
}
