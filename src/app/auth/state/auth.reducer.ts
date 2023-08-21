import type { Customer } from '@commercetools/platform-sdk'
import { createReducer, on } from '@ngrx/store'

import { LoadStatus } from '../enums/load.enum'
import {
  clearErrorMessage,
  initUserState,
  loadUserFailure,
  loadUserSuccess,
  loginUser,
  signupUser,
} from './auth.actions'
import { userInitialState } from './constants/user-initial-state.const'
import { type UserState } from './models/user-state'

export const userReducer = createReducer(
  userInitialState,
  on(loginUser, (userState: UserState) => ({ ...userState, loadStatus: LoadStatus.loading })),
  on(signupUser, (userState: UserState) => ({ ...userState, loadStatus: LoadStatus.loading })),
  on(initUserState, (userState: UserState) => ({ ...userState, loadStatus: LoadStatus.loading })),
  on(loadUserSuccess, (userState: UserState, action: { customer: Customer }) => ({
    ...userState,
    loadStatus: LoadStatus.loaded,
    customer: action.customer,
  })),
  on(loadUserFailure, (userState: UserState, action: { errorMessage: string }) => ({
    ...userState,
    loadStatus: LoadStatus.notLoaded,
    errorMessage: action.errorMessage,
  })),
  on(clearErrorMessage, (userState: UserState) => ({
    ...userState,
    errorMessage: null,
  })),
)
