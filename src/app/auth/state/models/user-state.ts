import type { Customer } from '@commercetools/platform-sdk'

export interface UserState {
  isLoading: boolean
  errorMessage: string | null
  customer: Customer | null
}
