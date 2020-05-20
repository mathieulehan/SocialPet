import {Component, OnInit} from '@angular/core';
import {Species} from '../../shared/species';
import {Colors} from '../../shared/colors';
import {Motifs} from '../../shared/motifs';
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
  colors: string[];
  motifs: string[];
  image: string | ArrayBuffer;
  generatedBlobs: string[] = [];
  generatedBlobsDecoded: string[] = [];
  selectedFilesNames: string[] = [];
  uploadedAnimal = this.fb.group({
    raceControl: ['', Validators.required],
    specieControl: ['', Validators.required],
    colorControl: ['', Validators.required],
    motifControl: ['', Validators.required],
    photosControl: ['', Validators.required],
    rgpdControl: [false, Validators.requiredTrue]
  });

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer, dialog: MatDialog, snackBar: MatSnackBar,
              private rgpdDialog: MatDialog, private authService: AuthService, private imageService: ImageService) {
    super(snackBar, dialog);
  }
  ngOnInit(): void {
    this.species = Object.keys(Species);
    this.colors = Object.keys(Colors);
    this.motifs = Object.keys(Motifs);
  }

  uploadAnimal() {
    const newAnimal = new Image();
    for (const blob of this.generatedBlobs) {
      newAnimal.images.push(blob);
    }
    this.authService.ensureAuthenticated(localStorage.getItem('ACCESS_TOKEN')).then(response => {
      const user = response.data;
      newAnimal.email = user.email;
      newAnimal.couleur = this.colorControl.value[0];
      this.showSpinner();
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
  get raceControl() {
    return this.uploadedAnimal.get('raceControl');
  }
  get specieControl() {
    return this.uploadedAnimal.get('specieControl');
  }
  get colorControl() {
    return this.uploadedAnimal.get('colorControl');
  }
  get motifControl() {
    return this.uploadedAnimal.get('motifControl');
  }
  get photosControl() {
    return this.uploadedAnimal.get('photosControl');
  }

  get rgpdControl() {
    return this.uploadedAnimal.get('rgpdControl');
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
