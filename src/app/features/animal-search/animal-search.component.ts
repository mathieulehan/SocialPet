import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
  uploadedAnimal = this.fb.group({
    raceControl: [''],
    specieControl: [''],
    colorControl: [''],
    motifControl: [''],
    photosControl: ['', Validators.required]
  });
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.species = Object.keys(Species);
    this.colors = Object.keys(Colors);
    this.motifs = Object.keys(Motifs);
  }

  searchAnimal() {
    console.warn(this.uploadedAnimal.value);
  }

  get photosControl() {
    return this.uploadedAnimal.get('photosControl');
  }

}
