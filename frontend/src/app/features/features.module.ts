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
import {MatGridListModule} from '@angular/material/grid-list';
import { AboutUsComponent } from './about-us/about-us.component';
import { LegalComponent } from './legal/legal.component';
import {MatCardModule} from '@angular/material/card';
import { ConnectionComponent } from './connection/connection.component';
import {MatTabsModule} from '@angular/material/tabs';

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
        MatGridListModule,
        MatCardModule,
        MatTabsModule
    ],
  declarations : [
    AnimalSearchComponent, HomeComponent, NoPageFoundComponent, UploadFormComponent, AboutUsComponent, LegalComponent, ConnectionComponent
  ]
})
export class FeaturesModule { }
