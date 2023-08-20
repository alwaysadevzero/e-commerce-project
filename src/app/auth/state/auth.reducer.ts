import type { Customer } from '@commercetools/platform-sdk'
import { createReducer, on } from '@ngrx/store'

import { clearErrorMessage, loadUserFailure, loadUserSuccess, loginUser, signupUser } from './auth.actions'
import { userInitialState } from './constants/user-initial-state.const'
import { type UserState } from './models/user-state'

export const userReducer = createReducer(
  userInitialState,
  on(loginUser, (userState: UserState) => ({ ...userState, isLoading: true })),
  on(signupUser, (userState: UserState) => ({ ...userState, isLoading: true })),
  on(loadUserSuccess, (userState: UserState, action: { customer: Customer }) => ({
    ...userState,
    isLoading: false,
    customer: action.customer,
  })),
  on(loadUserFailure, (userState: UserState, action: { errorMessage: string }) => ({
    ...userState,
    isLoading: false,
    errorMessage: action.errorMessage,
  })),
  on(clearErrorMessage, (userState: UserState) => ({
    ...userState,
    errorMessage: null,
  })),
)
