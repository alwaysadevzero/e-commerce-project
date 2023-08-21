import type { Customer, MyCustomerDraft } from '@commercetools/platform-sdk'
import { createAction, props } from '@ngrx/store'

import type { User } from '../../shared/models/user-data'
import { CreateActionGroup } from '../enums/create-action-group.enum'

export const loginUser = createAction(CreateActionGroup.loginUser, props<{ user: User }>())

export const signupUser = createAction(CreateActionGroup.signupUser, props<{ customerDraft: MyCustomerDraft }>())

export const logoutUser = createAction(CreateActionGroup.logoutUser)

export const initUserState = createAction(CreateActionGroup.initUserState)

export const loadUserSuccess = createAction(CreateActionGroup.loadUserSuccess, props<{ customer: Customer }>())

export const loadUserFailure = createAction(CreateActionGroup.loadUserFailure, props<{ errorMessage: string }>())

export const clearErrorMessage = createAction(CreateActionGroup.clearErrorMessage)

export const logoutUserSuccess = createAction(CreateActionGroup.logoutUserSuccess)
