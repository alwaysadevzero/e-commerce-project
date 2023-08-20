import { NgModule } from '@angular/core'
import { RouterModule, type Routes } from '@angular/router'

import { AuthGuard } from './core/guards/auth.guard'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main' },
  {
    path: 'main',
    title: 'Main',
    loadComponent: () => import('./main/main-page.component').then(mod => mod.MainComponent),
  },
  {
    path: 'sign-up',
    title: 'Sign up',
    loadComponent: () => import('./auth/sign-up/sign-up.component').then(mod => mod.SignUpComponent),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'sign-in',
    title: 'Sign in',
    loadComponent: () => import('./auth/sign-in/sign-in.component').then(mod => mod.SignInComponent),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: '**',
    title: '404 - Not found',
    loadComponent: () => import('./core/components/not-found/not-found.component').then(mod => mod.NotFoundComponent),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
