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
import {ShowAllImagesComponent} from './show-all-images/show-all-images.component';
import {AuthComponent} from './auth/auth.component';
import {AdminComponent} from './admin/admin.component';
import {MatToolbarComponent} from './mat-toolbar/mat-toolbar.component';
import {AuthService} from '../shared/services/auth.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ProgressSpinnerDialogComponent} from './progress-spinner-dialog/progress-spinner-dialog-component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSidenavComponent} from './mat-sidenav/mat-sidenav.component';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {SnackBarAbleComponent} from './snack-bar-able/snack-bar-able.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {RgpdComponent} from './rgpd/rgpd.component';
import {RgpdDialogComponent} from './rgpd-dialog/rgpd-dialog.component';

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
    MatTabsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatCheckboxModule
  ],
  declarations: [
    AnimalSearchComponent, HomeComponent, NoPageFoundComponent, UploadFormComponent, AboutUsComponent, LegalComponent,
    ConnectionComponent, ShowAllImagesComponent, AuthComponent, AdminComponent, MatToolbarComponent,
    MatSidenavComponent, ProgressSpinnerDialogComponent, SnackBarAbleComponent, RgpdComponent, RgpdDialogComponent
  ],
  exports: [
    MatToolbarComponent,
    MatSidenavComponent
  ],
  providers: [AuthService],
  entryComponents: [ProgressSpinnerDialogComponent],
})
export class FeaturesModule { }
