import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// Routers
import {APP_ROUTING} from './Routes/router';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/primarycomponents/navbar/navbar.component';
import { LoginComponent } from './components/primarycomponents/login/login.component';
import { RegistrationComponent } from './components/primarycomponents/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { ComentariesComponent } from './components/comentaries/comentaries.component';
import { Page404Component } from './components/wildcards/page404/page404.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    PublicationsComponent,
    ComentariesComponent,
    Page404Component,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    APP_ROUTING,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
