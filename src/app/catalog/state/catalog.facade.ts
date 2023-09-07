import { inject, Injectable } from '@angular/core'
import { Actions } from '@ngrx/effects'
import { Store } from '@ngrx/store'

import { catalogActions } from './catalog.actions'
import { selectProducts } from './catalog.selector'

@Injectable({
  providedIn: 'root',
})
export class CatalogFacade {
  private store$ = inject(Store)
  private actions$ = inject(Actions)
  public products$ = this.store$.select(selectProducts)

  public initCatalogState(): void {
    this.store$.dispatch(catalogActions.initCatalogState())
  }
}
