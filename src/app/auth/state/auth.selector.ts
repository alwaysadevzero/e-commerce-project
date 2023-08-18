import { createFeatureSelector, createSelector } from '@ngrx/store'

import { type UserState } from './models/user-state'
import { type User } from 'src/app/shared/models/user-data'

const selectUserFeature = createFeatureSelector<UserState>('user')

export const selectIsLoading = createSelector(selectUserFeature, (userState: UserState) => userState.isLoading)

export const selectUser = createSelector(selectUserFeature, (userState: UserState): UserState => userState)

export const selectErrorMessage = createSelector(selectUserFeature, (userState: UserState) => userState.errorMessage)
