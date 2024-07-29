import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/container/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/container/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./sign-up/container/sign-up/sign-up.page').then( m => m.SignUpPage)
  },
  {
    path: 'forget-password',
    loadComponent: () => import('./forget-password/container/forget-password/forget-password.page').then( m => m.ForgetPasswordPage)
  }
];
