import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../components/home/home.component';
import {LoginComponent} from '../components/master-components/login/login.component';
import {RegistrationComponent} from '../components/master-components/registration/registration.component';
import {PublicationsComponent} from '../components/publications/publications.component';
import {ProfileComponent} from '../components/profile/profile.component';
import {Page404Component} from '../components/wildcards/page404/page404.component';
import {AuthGuardService} from '../services/auth-guard/auth-guard.service';
import {ComentariesComponent} from '../components/comentaries/comentaries.component';
import {BlogComponent} from '../components/blog/blog.component';

const APP_ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'blog', component: BlogComponent, canActivate: [AuthGuardService]},
  // {path: 'comentaries', component: ComentariesComponent, canActivate: [AuthGuardService]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  // {path: 'publication', component: PublicationsComponent, canActivate: [AuthGuardService]},
  {path: '**', pathMatch: 'full', component: Page404Component}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
