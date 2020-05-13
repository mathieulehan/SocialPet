import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule} from '@angular/forms';
import { FeaturesModule } from './features/features.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import {MatButtonModule} from '@angular/material/button';
import { MatSidenavComponent } from './features/mat-sidenav/mat-sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    MatSidenavComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    MatSidenavModule,
    FormsModule,
    FeaturesModule,
    MatToolbarModule,
    MatListModule,
    MatButtonToggleModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
