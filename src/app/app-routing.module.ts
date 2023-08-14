import { NgModule } from '@angular/core'
import { RouterModule, type Routes } from '@angular/router'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main' },
  {
    path: 'main',
    title: 'main',
    loadComponent: () => import('./main/main-page.component').then(mod => mod.MainComponent),
  },
  {
    path: 'sign-up',
    title: 'Sign up',
    loadComponent: () => import('./auth/sign-up-form/sign-up-form.component').then(mod => mod.SignUpFormComponent),
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
})
export class AppRoutingModule {}
