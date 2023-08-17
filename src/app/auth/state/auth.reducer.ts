import { createReducer, on } from '@ngrx/store'

import { type User } from '../../shared/models/user-data'
import { loadUser, loadUserFailure, loadUserSuccess } from './auth.actions'
import { userInitialState } from './constants/user-initial-state.const'
import { type UserState } from './models/user-state'

export const userReducer = createReducer(
  userInitialState,
  on(loadUser, (userState: UserState) => ({ ...userState, isLoading: true })),
  on(loadUserSuccess, (userState: UserState, action: { user: User }) => ({
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
