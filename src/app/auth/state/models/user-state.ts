import { type User } from '../../../shared/models/user-data'

export interface UserState {
  isLoading: boolean
  errorMessage: string | null
  user: User
}
