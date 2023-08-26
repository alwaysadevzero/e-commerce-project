import { createReducer, on } from '@ngrx/store'

import { LoadStatus } from '../enums/load.enum'
import { authActions } from './auth.actions'
import { customerInitialState } from './constants/user-initial-state.const'
import type { CustomerState } from './models/user-state'

export const userReducer = createReducer(
  customerInitialState,
  on(
    authActions.loginCustomer,
    authActions.registerCustomer,
    authActions.initCustomerState,
    authActions.loadAnonymousCustomer,
    (customerState: CustomerState) => ({
      ...customerState,
      loadStatus: LoadStatus.loading,
    }),
  ),
  on(authActions.loadCustomerSuccess, authActions.refreshCustomerSuccess, (customerState, { customer }) => ({
    ...customerState,
    loadStatus: LoadStatus.loaded,
    customer,
    errorMessage: null,
  })),
  on(authActions.loadCustomerFailure, authActions.loadAnonymousCustomerFailure, (customerState, { errorMessage }) => ({
    ...customerState,
    loadStatus: LoadStatus.notLoaded,
    errorMessage,
  })),
  on(authActions.clearErrorMessage, customerState => ({
    ...customerState,
    errorMessage: null,
  })),
  on(authActions.loadAnonymousCustomerSuccess, () => customerInitialState),
)
