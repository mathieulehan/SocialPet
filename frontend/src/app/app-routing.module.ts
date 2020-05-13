import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import { AnimalSearchComponent } from './features/animal-search/animal-search.component';
import { UploadFormComponent } from './features/upload-form/upload-form.component';
import { NoPageFoundComponent } from './features/no-page-found/no-page-found.component';
import { HomeComponent } from './features/home/home.component';
import {AboutUsComponent} from './features/about-us/about-us.component';
import {LegalComponent} from './features/legal/legal.component';
import {ConnectionComponent} from './features/connection/connection.component';
import {ShowAllImagesComponent} from './features/show-all-images/show-all-images.component';
import {AuthComponent} from './features/auth/auth.component';
import {AdminComponent} from './features/admin/admin.component';
import {AuthGuard} from './shared/guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: AnimalSearchComponent, canActivate: [AuthGuard] },
  { path: 'submit', component: UploadFormComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutUsComponent },
  { path: 'legal', component: LegalComponent },
  { path: 'connect', component: ConnectionComponent },
  { path: 'images', component: ShowAllImagesComponent, canActivate: [AuthGuard] },
  { path: 'auth', component: AuthComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
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
