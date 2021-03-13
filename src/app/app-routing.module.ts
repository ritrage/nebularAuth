import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbAuthComponent, NbLoginComponent, NbLogoutComponent } from '@nebular/auth';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path:'auth',
    component: NbAuthComponent,
    children: [
      {
        path:'',
        component: LoginComponent,
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'logout',
        component: NbLogoutComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full'
  },
  {
    path:'login',
    redirectTo: '/auth'
  },
  {
    path: 'profile',
    redirectTo: '/auth/profile'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
