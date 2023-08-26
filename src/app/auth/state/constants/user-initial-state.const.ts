import { LoadStatus } from '../../enums/load.enum'
import type { CustomerState } from '../models/user-state'

export const customerInitialState: CustomerState = {
  loadStatus: LoadStatus.notLoaded,
  errorMessage: null,
  customer: null,
}
