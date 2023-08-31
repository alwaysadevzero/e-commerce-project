import { createReducer, on } from '@ngrx/store'

import { LoadStatus } from '../../enums/load.enum'
import { customerInitialState } from './constants/customer-initial-state.const'
import { customerActions } from './customer.actions'
import type { CustomerState } from './models/customer-state'

export const customerReducer = createReducer(
  customerInitialState,
  on(
    customerActions.changePasswordCustomer,
    customerActions.loadAnonymousCustomer,
    customerActions.loginCustomer,
    customerActions.initCustomerState,
    customerActions.logoutCustomer,
    customerActions.registerCustomer,
    customerActions.refreshCustomer,
    (customerState: CustomerState) => ({
      ...customerState,
      loadStatus: LoadStatus.loading,
    }),
  ),
  on(
    customerActions.loginCustomerSuccess,
    customerActions.refreshCustomerSuccsess,
    customerActions.registerCustomerSuccsess,
    customerActions.reloginCustomerSuccsess,
    customerActions.setCustomer,
    (customerState, { customer }) => ({
      ...customerState,
      customer,
      loadStatus: LoadStatus.loaded,
      errorMessage: null,
    }),
  ),
  on(
    customerActions.loadAnonymousCustomerFailure,
    customerActions.changePasswordCustomerFailure,
    customerActions.loginCustomerFailure,
    customerActions.refreshCustomerFailure,
    customerActions.registerCustomerFailure,
    customerActions.reloginCustomerFailure,
    (customerState, { errorMessage }) => ({
      ...customerState,
      loadStatus: LoadStatus.notLoaded,
      errorMessage,
    }),
  ),
  on(customerActions.clearErrorMessage, customerState => ({
    ...customerState,
    errorMessage: null,
  })),
  on(customerActions.resetCustomerState, customerActions.loadAnonymousCustomerSuccess, () => customerInitialState),
)
