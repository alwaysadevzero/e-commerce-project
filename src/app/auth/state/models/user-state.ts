import type { Customer, Project } from '@commercetools/platform-sdk'

export interface UserState {
  isLoading: boolean
  errorMessage: string | null
  user: Customer | null
}
