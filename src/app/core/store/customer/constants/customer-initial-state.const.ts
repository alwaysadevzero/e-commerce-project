import { LoadStatus } from '../../../enums/load.enum'
import type { CustomerState } from '../models/customer-state'

export const customerInitialState: CustomerState = {
  loadStatus: LoadStatus.notLoaded,
  errorMessage: null,
  customer: null,
}
