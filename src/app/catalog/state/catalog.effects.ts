import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'

import { ProductHttpService } from '../services/product.service'
import { catalogActions } from './catalog.actions'

@Injectable()
export class CatalogEffects {
  private actions$ = inject(Actions)
  private productService = inject(ProductHttpService)

  catalogInitState = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogActions.initCatalogState),
      switchMap(() =>
        this.productService.getProducts().pipe(map(product => catalogActions.initCatalogStateSuccess(product))),
      ),
      catchError((errorMessage: string) => of(catalogActions.initCatalogStateFailure(errorMessage))),
    ),
  )
}
