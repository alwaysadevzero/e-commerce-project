import { type UserState } from '../models/user-state'

export const userInitialState: UserState = {
  isLoading: false,
  errorMessage: null,
  customer: null,
}
