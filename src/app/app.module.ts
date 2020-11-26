import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { reducers } from './reducers';
import { effects } from './effects';
import { DataService } from './services/data.service';
import { PanoramaComponent } from './panorama.component';
import { envModules } from 'src/environments/modules';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),

    // contains env specific tools like ngrx debug
    envModules
  ],
  providers: [
    DataService,
  ],
  declarations: [
    AppComponent,
    PanoramaComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
