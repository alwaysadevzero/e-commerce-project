import { NgModule } from '@angular/core'
import { RouterModule, type Routes } from '@angular/router'

import { authGuardFn } from './core/guards/auth.guard'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main' },
  {
    path: 'main',
    title: 'Main',
    loadComponent: () => import('./main/main-page.component').then(component => component.MainComponent),
  },
  {
    path: 'sign-up',
    title: 'Sign up',
    loadComponent: () => import('./auth/sign-up/sign-up.component').then(component => component.SignUpComponent),
    canMatch: [authGuardFn],
  },
  {
    path: 'sign-in',
    title: 'Sign in',
    loadComponent: () => import('./auth/sign-in/sign-in.component').then(component => component.SignInComponent),
    canMatch: [authGuardFn],
  },
  {
    path: '**',
    title: '404 - Not found',
    loadComponent: () =>
      import('./core/components/not-found/not-found.component').then(component => component.NotFoundComponent),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
