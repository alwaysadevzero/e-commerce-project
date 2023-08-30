import { importProvidersFrom, NgModule } from '@angular/core'
import { RouterModule, type Routes } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'

import { authGuardFn } from './core/guards/auth.guard'
import { profileGuardFn } from './core/guards/profile.guard'
import { ProfileEffects } from './profile/state/profile.effects'

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
    path: 'profile',
    title: 'Profile',
    loadComponent: () => import('./profile/profile.component').then(component => component.ProfileComponent),
    providers: [importProvidersFrom(EffectsModule.forFeature([ProfileEffects]))],
    canMatch: [profileGuardFn],
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
