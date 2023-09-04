import { createReducer, on } from '@ngrx/store'

import { LoadStatus } from '../../enums/load.enum'
import { customerInitialState } from './constants/customer-initial-state.const'
import { customerActions } from './customer.actions'
import type { CustomerState } from './models/customer-state'

export const customerReducer = createReducer(
  customerInitialState,
  on(customerActions.loadCustomer, customerActions.initCustomerState, (customerState: CustomerState) => ({
    ...customerState,
    loadStatus: LoadStatus.loading,
  })),
  on(customerActions.loadCustomerSuccess, customerActions.setCustomer, (customerState, { customer }) => ({
    ...customerState,
    customer,
    loadStatus: LoadStatus.loaded,
    errorMessage: null,
  })),
  on(customerActions.loadCustomerFailure, (customerState, { errorMessage }) => ({
    ...customerState,
    loadStatus: LoadStatus.notLoaded,
    errorMessage,
  })),
  on(customerActions.clearErrorMessage, customerState => ({
    ...customerState,
    errorMessage: null,
  })),
  on(customerActions.resetCustomerState, () => customerInitialState),
)
