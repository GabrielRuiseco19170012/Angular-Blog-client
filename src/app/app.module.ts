import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// Routers
import {APP_ROUTING} from './Routes/router';

// Components
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/master-components/navbar/navbar.component';
import {LoginComponent} from './components/master-components/login/login.component';
import {RegistrationComponent} from './components/master-components/registration/registration.component';
import {HomeComponent} from './components/home/home.component';
import {PublicationsComponent} from './components/publications/publications.component';
import {ComentariesComponent} from './components/comentaries/comentaries.component';
import {Page404Component} from './components/wildcards/page404/page404.component';
import {ProfileComponent} from './components/profile/profile.component';

// Services
import {InterceptorService} from './services/interceptor/interceptor.service';
import {AuthService} from './services/auth/auth.service';
import {AuthGuardService} from './services/auth-guard/auth-guard.service';


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
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    APP_ROUTING,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
