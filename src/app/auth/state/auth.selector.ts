import { createFeatureSelector, createSelector } from '@ngrx/store'

import { type UserState } from './models/user-state'

const selectUserFeature = createFeatureSelector<UserState>('userState')

export const selectIsLoading = createSelector(selectUserFeature, (userState: UserState) => userState.isLoading)

export const selectUser = createSelector(selectUserFeature, (userState: UserState): UserState => userState)

export const selectErrorMessage = createSelector(selectUserFeature, (userState: UserState) => userState.errorMessage)
