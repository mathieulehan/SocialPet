import {AfterViewInit, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {ImageService} from '../../shared/services/image.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ImageFromBack} from '../../shared/models/image';
import {MatDialog} from '@angular/material/dialog';
import {SnackBarAbleComponent} from '../snack-bar-able/snack-bar-able.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {User} from '../../shared/models/user';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-show-all-images',
  templateUrl: './show-all-images.component.html',
  styleUrls: ['./show-all-images.component.scss']
})
export class ShowAllImagesComponent extends SnackBarAbleComponent implements OnInit, AfterViewInit {
  imagesData: ImageFromBack[];
  base64Str = 'data:image/jpg;base64,';
  user: User;
  @ViewChild('container') theContainer;
  columnNum = 3;
  tileSize = 230;

  constructor(private imageService: ImageService, private sanitizer: DomSanitizer, dialog: MatDialog, snackBar: MatSnackBar, private authService: AuthService) {
    super(snackBar, dialog);
  }

  ngOnInit(): void {
    this.showSpinner();
    this.authService.ensureAuthenticated(localStorage.getItem('ACCESS_TOKEN')).then(response => {
      this.user = response.data;
      this.imageService.getImagesByUserId(this.user.user_id).subscribe(res => {
      this.imagesData = res.images;
      this.sanitizeImages();
      this.hideSpinner();
      },
      error => {
        this.hideSpinner();
        this.openSnackBar(error.toString(), 'Oups');
      });
    });
  }

  private sanitizeImages() {
    this.imagesData.forEach(
      image => {
        image.sanitizedPath = (this.sanitizer.bypassSecurityTrustResourceUrl(this.base64Str + image.img));
      }
      );
  }

  setColNum() {
    const width = this.theContainer.nativeElement.offsetWidth;
    this.columnNum = Math.trunc(width / this.tileSize);
  }

  ngAfterViewInit() {
    this.setColNum();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setColNum();
  }

}
