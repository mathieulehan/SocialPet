import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import { AnimalSearchComponent } from './features/animal-search/animal-search.component';
import { UploadFormComponent } from './features/upload-form/upload-form.component';
import { NoPageFoundComponent } from './features/no-page-found/no-page-found.component';
import { HomeComponent } from './features/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: AnimalSearchComponent },
  { path: 'submit', component: UploadFormComponent },
  { path: '**', component: NoPageFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
