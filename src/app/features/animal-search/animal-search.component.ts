import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Species} from '../../shared/species';
import {Colors} from '../../shared/colors';
import {Motifs} from '../../shared/motifs';

@Component({
  selector: 'app-animal-search',
  templateUrl: './animal-search.component.html',
  styleUrls: ['./animal-search.component.scss']
})
export class AnimalSearchComponent implements OnInit {
  title = 'Recherche d\'animal';
  speech = 'Voici pourquoi il est important d\'effectuer un traitement sur les images avant de nous les fournir.';
  species: string[];
  colors: string[];
  motifs: string[];
  formBuilder: FormBuilder;
  uploadedAnimal: FormGroup;
  specieControl: FormControl;
  colorControl: FormControl;
  motifControl: FormControl;

  constructor() { }

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
