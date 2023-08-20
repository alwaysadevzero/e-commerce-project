import type { Customer } from '@commercetools/platform-sdk'

import type { LoadStatus } from '../../enums/load.enum'

export interface UserState {
  loadStatus: LoadStatus
  errorMessage: string | null
  customer: Customer | null
}
