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
  test: any;
  image: string | ArrayBuffer;
  generatedBlobs: string[] = [];
  generatedBlobsDecoded: string[] = [];
  selectedFilesNames: string[] = [];
  uploadedAnimal = this.fb.group({
    raceControl: ['', Validators.required],
    specieControl: ['', Validators.required],
    colorControl: ['', Validators.required],
    motifControl: ['', Validators.required],
    photosControl: ['', Validators.required]
  });
  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer, dialog: MatDialog, snackBar: MatSnackBar) {
    super(snackBar, dialog);
  }
  ngOnInit(): void {
    this.species = Object.keys(Species);
    this.colors = Object.keys(Colors);
    this.motifs = Object.keys(Motifs);
  }

  uploadAnimal() {
    this.showSpinner();
    this.hideSpinner();
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

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    const files: FileList = inputValue.files;
    Array.from(files).forEach(file => {
      const myReader: FileReader = new FileReader();
      myReader.onloadend = (e) => {
        this.generatedBlobs.push(myReader.result as string);
        this.generatedBlobsDecoded.push(this.sanitizer.bypassSecurityTrustResourceUrl(myReader.result as string) as string);
      };
      this.selectedFilesNames.push(file.name);
      myReader.readAsDataURL(file);
    });
  }
}
