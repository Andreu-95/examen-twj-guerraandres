import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PasteleriaComponent } from './pasteleria/pasteleria.component';
import { PastelComponent } from './pastel/pastel.component';
import { HomeComponent } from './home/home.component';
import {routing} from "./app.routes";
import {MasterURLService} from "./services/master-url.service";

@NgModule({
  declarations: [
    AppComponent,
    PasteleriaComponent,
    PastelComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    MasterURLService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
