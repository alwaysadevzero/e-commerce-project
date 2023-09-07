import { createFeatureSelector, createSelector } from '@ngrx/store'

import type { CatalogState } from './models/catalog.state'

const selectCatalogFeature = createFeatureSelector<CatalogState>('catalogState')

export const selectProducts = createSelector(selectCatalogFeature, ({ products }) => products)

// export const selectCustomer = createSelector(selectCustomerFeature, ({ customer }) => customer)

// export const selectErrorMessage = createSelector(selectCustomerFeature, ({ errorMessage }) => errorMessage)
