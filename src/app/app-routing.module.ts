import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PatientComponent } from './components/patient/patient.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthenticateUserService } from './services/authenticate-user.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: SigninComponent },

  {
    path: 'home', component: HomeComponent,
    canActivate: [() => {
      return inject(AuthenticateUserService).verifyLogin();
    }],
  },
  {
    path: 'patient', component: PatientComponent,
    canActivate: [() => {
      return inject(AuthenticateUserService).verifyLogin();
    }],
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
