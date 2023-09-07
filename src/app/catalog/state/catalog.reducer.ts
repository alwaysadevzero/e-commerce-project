import { createReducer, on } from '@ngrx/store'

import { catalogActions } from './catalog.actions'
import { catalogInitialState } from './constants/customer-initial-state.const'

export const catalogReducer = createReducer(
  catalogInitialState,
  on(catalogActions.initCatalogStateSuccess, (catalogState, { products }) => ({
    ...catalogState,
    products,
  })),
)
