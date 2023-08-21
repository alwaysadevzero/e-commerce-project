import { LoadStatus } from '../../enums/load.enum'
import { type UserState } from '../models/user-state'

export const userInitialState: UserState = {
  loadStatus: LoadStatus.notLoaded,
  errorMessage: null,
  customer: null,
}
