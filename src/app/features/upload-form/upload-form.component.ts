import {Component, Input, OnInit} from '@angular/core';
import {Species} from '../../shared/species';
import {Colors} from '../../shared/colors';
import {Motifs} from '../../shared/motifs';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent implements OnInit {
  title = 'Participer au projet banque de données Social Pet';
  speech = 'Voici pourquoi c\'est important de fournir plusieurs images, voici comment elles sont traitées et comment ces informations personnelles ' +
    'permettrons de vous contacter si votre animal a le malheur de disparaître.';
  species: string[];
  colors: string[];
  motifs: string[];
  formBuilder: FormBuilder;
  uploadedAnimal: FormGroup;
  specieControl: FormControl;
  colorControl: FormControl;
  motifControl: FormControl;

  ngOnInit(): void {
    this.species = Object.keys(Species);
    this.colors = Object.keys(Colors);
    this.motifs = Object.keys(Motifs);
    this.formBuilder = new FormBuilder();
    this.specieControl = new FormControl();
    this.colorControl = new FormControl();
    this.motifControl = new FormControl();
    this.uploadedAnimal = this.formBuilder.group({
      race: '',
      subscriber: '',
      email: '',
    });
  }
}
