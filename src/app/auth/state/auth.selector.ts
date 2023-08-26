import { createFeatureSelector, createSelector } from '@ngrx/store'

import type { CustomerState } from './models/user-state'

const selectCustomerFeature = createFeatureSelector<CustomerState>('customerState')

export const selectLoadStatus = createSelector(selectCustomerFeature, ({ loadStatus }) => loadStatus)

export const selectCustomer = createSelector(selectCustomerFeature, ({ customer }) => customer)

export const selectErrorMessage = createSelector(selectCustomerFeature, ({ errorMessage }) => errorMessage)
