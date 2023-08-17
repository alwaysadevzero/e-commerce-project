import { createAction, props } from '@ngrx/store'

import { UserActionTypes } from '../enums/auth-action-types.enum'
import { type User } from 'src/app/shared/models/user-data'

export const loadUser = createAction(UserActionTypes.loadUser)

export const loadUserSuccess = createAction(UserActionTypes.loadUserSuccess, props<{ user: User }>())

export const loadUserFailure = createAction(UserActionTypes.loadUserFailure, props<{ errorMessage: string }>())
