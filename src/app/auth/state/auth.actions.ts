import type { Customer, MyCustomerDraft } from '@commercetools/platform-sdk'
import { createAction, props } from '@ngrx/store'

import type { User } from '../../shared/models/user-data'
import { UserActionTypes } from '../enums/auth-action-types.enum'

export const loginUser = createAction(UserActionTypes.loginUser, props<{ user: User }>())

export const signupUser = createAction(UserActionTypes.signupUser, props<{ customerDraft: MyCustomerDraft }>())

export const logoutUser = createAction(UserActionTypes.logoutUser)

export const initUserState = createAction(UserActionTypes.initUserState)

export const loadUserSuccess = createAction(UserActionTypes.loadUserSuccess, props<{ customer: Customer }>())

export const loadUserFailure = createAction(UserActionTypes.loadUserFailure, props<{ errorMessage: string }>())

export const clearErrorMessage = createAction(UserActionTypes.clearErrorMessage)

export const logoutUserSuccess = createAction(UserActionTypes.logoutUserSuccess)
