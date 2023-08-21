import { createFeatureSelector, createSelector } from '@ngrx/store'

import { type UserState } from './models/user-state'

const selectUserFeature = createFeatureSelector<UserState>('userState')

export const selectLoadStatus = createSelector(selectUserFeature, (userState: UserState) => userState.loadStatus)

export const selectUser = createSelector(selectUserFeature, (userState: UserState): UserState => userState)

export const selectErrorMessage = createSelector(selectUserFeature, (userState: UserState) => userState.errorMessage)
