import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Species} from '../../shared/species';
import {Colors} from '../../shared/colors';
import {Motifs} from '../../shared/motifs';
import {DomSanitizer} from '@angular/platform-browser';
import {ImageService} from '../../shared/services/image.service';
import {Image, ImageFromBack} from '../../shared/models/image';
import {MatDialog} from '@angular/material/dialog';
import {SnackBarAbleComponent} from '../snack-bar-able/snack-bar-able.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../../shared/services/auth.service';
import {RgpdDialogComponent} from '../rgpd-dialog/rgpd-dialog.component';

@Component({
  selector: 'app-animal-search',
  templateUrl: './animal-search.component.html',
  styleUrls: ['./animal-search.component.scss']
})
export class AnimalSearchComponent extends SnackBarAbleComponent implements OnInit {
  title = 'Recherche d\'animal';
  speech = 'Voici pourquoi il est important d\'effectuer un traitement sur les images avant de nous les fournir.';
  species: string[];
  colors: string[];
  motifs: string[];
  generatedBlobs: string[] = [];
  generatedBlobsDecoded: string[] = [];
  uploadedAnimal = this.fb.group({
    raceControl: [''],
    specieControl: [''],
    colorControl: [''],
    motifControl: [''],
    photosControl: ['', Validators.required],
    rgpdControl: [false, Validators.requiredTrue]
  });
  imagesData: ImageFromBack[];
  base64Str = 'data:image/jpg;base64,';
  @ViewChild('container') theContainer;
  columnNum = 3;
  tileSize = 230;

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer, private imageService: ImageService,
              dialog: MatDialog, snackBar: MatSnackBar, private authService: AuthService, private rgpdDialog: MatDialog) {
    super(snackBar, dialog);
  }

  ngOnInit(): void {
    this.species = Object.keys(Species);
    this.colors = Object.keys(Colors);
    this.motifs = Object.keys(Motifs);
  }

  searchAnimal() {
    const newAnimal = new Image();
    for (const blob of this.generatedBlobs) {
      newAnimal.images.push(blob);
    }
    this.authService.ensureAuthenticated(localStorage.getItem('ACCESS_TOKEN')).then(response => {
        const user = response.data;
        newAnimal.email = user.email;
        newAnimal.couleur = this.color.value[0];
        this.showSpinner();
        this.imageService.getRelatedImages(newAnimal).subscribe(res => {
          this.imagesData = res.images;
          this.sanitizeImages();
          this.hideSpinner();
          this.openSnackBar('Voici les animaux pouvant ressembler', 'OK');
        },
      error => {
        this.hideSpinner();
        this.openSnackBar(error.toString(), 'Oups');
        });
      });
  }

  get photosControl() {
    return this.uploadedAnimal.get('photosControl');
  }

  get color() {
    return this.uploadedAnimal.get('colorControl');
  }

  get rgpdControl() {
    return this.uploadedAnimal.get('rgpdControl');
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  openRgpdDialog() {
    this.rgpdDialog.open(RgpdDialogComponent);
  }

  readThis(inputValue: any): void {
    const files: FileList = inputValue.files;
    Array.from(files).forEach(file => {
      const myReader: FileReader = new FileReader();
      myReader.onloadend = (e) => {
        this.generatedBlobs.push(myReader.result.toString().substring(myReader.result.toString().indexOf('base64,') + 7));
        this.generatedBlobsDecoded.push(this.sanitizer.bypassSecurityTrustResourceUrl(myReader.result as string) as string);
      };
      myReader.readAsDataURL(file);
    });
  }

  private sanitizeImages() {
    this.imagesData.forEach(
      image => {
        image.sanitizedPath = (this.sanitizer.bypassSecurityTrustResourceUrl(this.base64Str + image.img));
      }
    );
  }

}
