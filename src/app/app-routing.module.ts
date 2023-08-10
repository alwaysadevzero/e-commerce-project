import { NgModule } from '@angular/core'
import { RouterModule, type Routes } from '@angular/router'

import { MainComponent } from './main/main-page.component'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main' },
  {
    path: 'main',
    title: 'main',
    loadComponent: () => import('./main/main-page.component').then(mod => mod.MainComponent),
  },
  {
    path: '**',
    title: 'not-found',
    loadComponent: () => import('./core/components/not-found/not-found.component').then(mod => mod.NotFoundComponent),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
