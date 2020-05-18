import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Species} from '../../shared/species';
import {Colors} from '../../shared/colors';
import {Motifs} from '../../shared/motifs';
import {DomSanitizer} from '@angular/platform-browser';
import {ImageService} from '../../shared/services/image.service';
import {Image} from '../../shared/models/image';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ProgressSpinnerDialogComponent} from '../progress-spinner-dialog/progress-spinner-dialog-component';
import {SnackBarAbleComponent} from '../snack-bar-able/snack-bar-able.component';
import {MatSnackBar} from '@angular/material/snack-bar';

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
  modelResponse: any;
  generatedBlobs: string[] = [];
  generatedBlobsDecoded: string[] = [];
  uploadedAnimal = this.fb.group({
    raceControl: [''],
    specieControl: [''],
    colorControl: [''],
    motifControl: [''],
    photosControl: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer, private imageService: ImageService, dialog: MatDialog, snackBar: MatSnackBar) {
    super(snackBar, dialog);
  }

  ngOnInit(): void {
    this.species = Object.keys(Species);
    this.colors = Object.keys(Colors);
    this.motifs = Object.keys(Motifs);
  }

  searchAnimal() {
    for (const blob of this.generatedBlobs) {
      const newAnimal = new Image();
      newAnimal.img = blob;
      newAnimal.email = 'valra@live.fr';
      this.showSpinner();
      this.imageService.saveAnimal(newAnimal).subscribe(res => {
        this.modelResponse = res;
        this.hideSpinner();
        this.openSnackBar(res.item, 'OK');
      },
      error => {
        this.hideSpinner();
        this.openSnackBar(error.toString(), 'Oups');
      });
    }
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
        this.generatedBlobs.push(myReader.result.toString().substring(myReader.result.toString().indexOf('base64,') + 7));
        this.generatedBlobsDecoded.push(this.sanitizer.bypassSecurityTrustResourceUrl(myReader.result as string) as string);
      };
      myReader.readAsDataURL(file);
    });
  }

}
