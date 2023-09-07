import { CommonModule } from '@angular/common'
import { inject, NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { CatalogEffects } from './state/catalog.effects'
import { CatalogFacade } from './state/catalog.facade'
import { catalogReducer } from './state/catalog.reducer'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('catalogState', catalogReducer),
    EffectsModule.forFeature([CatalogEffects]),
  ],
})
export class CatalogModule {
  private catalogFacade = inject(CatalogFacade)
  constructor() {
    this.catalogFacade.initCatalogState()
  }
}
