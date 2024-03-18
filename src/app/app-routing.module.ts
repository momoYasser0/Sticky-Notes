import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './Core/Guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', canActivate: [authGuard], loadComponent: () => import('./Components/home/home.component').then(c => c.HomeComponent), title: 'Notes' },
  { path: 'login', loadComponent: () => import('./Components/login/login.component').then(c => c.LoginComponent), title: 'Login' },
  { path: 'register', loadComponent: () => import('./Components/register/register.component').then(c => c.RegisterComponent), title: 'Register' },
  { path: '**', loadComponent: () => import('./Components/notfound/notfound.component').then(c => c.NotfoundComponent), title: 'Not Found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
