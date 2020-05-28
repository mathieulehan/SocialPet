import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Species} from '../../shared/species';
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
  speech = 'En fournissant ici plusieurs photos du même animal, vous augmentez les chances que le bon propriétaire. ' +
    'Un algorithme va analyse les images et retrouver les animaux y ressemblant le plus. ' +
    'Vous aurez le dernier mot et pourrez sélectionner le bon animal parmi ceux qui vous seront proposés par SocialPet.';
  species: string[];
  generatedBlobs: string[] = [];
  generatedBlobsDecoded: string[] = [];
  uploadedAnimal = this.fb.group({
    race: [''],
    specie: ['', Validators.required],
    colors: [''],
    images: ['', Validators.required],
    rgpd: [false, Validators.requiredTrue]
  });
  imagesData: ImageFromBack[];
  base64Str = 'data:image/jpg;base64,';
  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer, private imageService: ImageService,
              dialog: MatDialog, snackBar: MatSnackBar, private authService: AuthService, private rgpdDialog: MatDialog) {
    super(snackBar, dialog);
  }

  ngOnInit(): void {
    this.species = Object.keys(Species);
  }

  searchAnimal() {
    const newAnimal: Image = this.uploadedAnimal.value;
    newAnimal.images = [];
    for (const blob of this.generatedBlobs) {
      newAnimal.images.push(blob);
    }
    this.authService.ensureAuthenticated(localStorage.getItem('ACCESS_TOKEN')).then(response => {
        const user = response.data;
        newAnimal.email = user.email;
        this.showSpinner();
        this.imageService.getRelatedImages(newAnimal).subscribe(res => {
          this.imagesData = res.images;
          this.sanitizeImages();
          this.hideSpinner();
          if (this.imagesData.length !== 0) {
            this.openSnackBar('Voici les animaux pouvant ressembler', 'OK');
          } else {
            this.openSnackBar('Aucun animal enregistré ne ressemble à celui que vous avez renseigné...', 'Zut');
          }
        },
      error => {
        this.hideSpinner();
        this.openSnackBar(error.toString(), 'Oups');
        });
      });
  }

  get images() {
    return this.uploadedAnimal.get('images');
  }

  get colors() {
    return this.uploadedAnimal.get('colors');
  }

  get rgpd() {
    return this.uploadedAnimal.get('rgpd');
  }

  get specie() {
    return this.uploadedAnimal.get('specie');
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
