import {Component, OnInit} from '@angular/core';
import {Species} from '../../shared/species';
import {Colors} from '../../shared/colors';
import {FormBuilder, Validators} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ProgressSpinnerDialogComponent} from '../progress-spinner-dialog/progress-spinner-dialog-component';
import {SnackBarAbleComponent} from '../snack-bar-able/snack-bar-able.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RgpdDialogComponent} from '../rgpd-dialog/rgpd-dialog.component';
import {Image, ImageFromBack} from '../../shared/models/image';
import {AuthService} from '../../shared/services/auth.service';
import {ImageService} from '../../shared/services/image.service';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent extends SnackBarAbleComponent implements OnInit {
  title = 'Participer au projet banque de données Social Pet';
  speech = 'Voici pourquoi c\'est important de fournir plusieurs images, voici comment elles sont traitées et comment ces informations personnelles ' +
    'permettrons de vous contacter si votre animal a le malheur de disparaître.';
  species: string[];
  colorsStr: string[];
  image: string | ArrayBuffer;
  generatedBlobs: string[] = [];
  generatedBlobsDecoded: string[] = [];
  uploadedAnimal = this.fb.group({
    race: ['', Validators.required],
    specie: ['', Validators.required],
    colors: ['', Validators.required],
    images: ['', Validators.required],
    rgpd: [false, Validators.requiredTrue]
  });

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer, dialog: MatDialog, snackBar: MatSnackBar,
              private rgpdDialog: MatDialog, private authService: AuthService, private imageService: ImageService) {
    super(snackBar, dialog);
  }
  ngOnInit(): void {
    this.species = Object.keys(Species);
    this.colorsStr = Object.keys(Colors);
  }

  uploadAnimal() {
    const newAnimal: Image = this.uploadedAnimal.value;
    newAnimal.images = [];
    for (const blob of this.generatedBlobs) {
      newAnimal.images.push(blob);
    }
    this.authService.ensureAuthenticated(localStorage.getItem('ACCESS_TOKEN')).then(response => {
      const user = response.data;
      newAnimal.email = user.email;
      this.showSpinner();
      console.log(newAnimal);
      this.imageService.saveAnimal(newAnimal).subscribe(res => {
          this.hideSpinner();
          this.openSnackBar(res.item.table, 'OK');
        },
        error => {
          this.hideSpinner();
          this.openSnackBar(error.toString(), 'Oups');
        });
    });
  }
  get race() {
    return this.uploadedAnimal.get('race');
  }
  get specie() {
    return this.uploadedAnimal.get('specie');
  }
  get colors() {
    return this.uploadedAnimal.get('colors');
  }
  get images() {
    return this.uploadedAnimal.get('images');
  }

  get rgpd() {
    return this.uploadedAnimal.get('rgpd');
  }

  changeListener($event): void {
    this.readThis($event.target);
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

  openRgpdDialog() {
    this.rgpdDialog.open(RgpdDialogComponent);
  }

}
