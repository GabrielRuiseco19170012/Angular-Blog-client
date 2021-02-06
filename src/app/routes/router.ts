import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../components/home/home.component';
import {LoginComponent} from '../components/primarycomponents/login/login.component';
import {RegistrationComponent} from '../components/primarycomponents/registration/registration.component';
import {PublicationsComponent} from '../components/publications/publications.component';
import {Page404Component} from '../components/wildcards/page404/page404.component';

const APP_ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: HomeComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'publications', component: PublicationsComponent},
  {path: '**', pathMatch: 'full', component: Page404Component }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
