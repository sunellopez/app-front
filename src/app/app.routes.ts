import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { AuthGuard } from './guard/guard.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage),
    canActivate: [async () => await inject(AuthGuard).canActivate()],
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
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
