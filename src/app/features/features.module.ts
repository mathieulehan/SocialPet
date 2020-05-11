import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UploadFormComponent} from './upload-form/upload-form.component';
import {HomeComponent} from './home/home.component';
import {AnimalSearchComponent} from './animal-search/animal-search.component';
import {NoPageFoundComponent} from './no-page-found/no-page-found.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from "@angular/material/grid-list";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule
  ],
  declarations : [
    AnimalSearchComponent, HomeComponent, NoPageFoundComponent, UploadFormComponent
  ]
})
export class FeaturesModule { }
