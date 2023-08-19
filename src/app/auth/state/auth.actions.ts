import type { Customer, MyCustomerDraft } from '@commercetools/platform-sdk'
import { createAction, props } from '@ngrx/store'

import { UserActionTypes } from '../enums/auth-action-types.enum'
import { type User } from 'src/app/shared/models/user-data'

export const loginUser = createAction(UserActionTypes.loginUser, props<{ user: User }>())

export const signupUser = createAction(UserActionTypes.signupUser, props<{ customer: MyCustomerDraft }>())

export const loadUserSuccess = createAction(UserActionTypes.loadUserSuccess, props<{ user: Customer }>())

export const loadUserFailure = createAction(UserActionTypes.loadUserFailure, props<{ errorMessage: string }>())
