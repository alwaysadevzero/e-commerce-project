import type { Customer } from '@commercetools/platform-sdk'
import { createReducer, on } from '@ngrx/store'

import { loadUserFailure, loadUserSuccess, loginUser, signupUser } from './auth.actions'
import { userInitialState } from './constants/user-initial-state.const'
import { type UserState } from './models/user-state'

export const userReducer = createReducer(
  userInitialState,
  on(loginUser, (userState: UserState) => ({ ...userState, isLoading: true })),
  on(signupUser, (userState: UserState) => ({ ...userState, isLoading: true })),
  on(loadUserSuccess, (userState: UserState, action: { user: Customer }) => ({
    ...userState,
    isLoading: false,
    user: action.user,
  })),
  on(loadUserFailure, (userState: UserState, action: { errorMessage: string }) => ({
    ...userState,
    isLoading: false,
    errorMessage: action.errorMessage,
  })),
)
