import { inject, Injectable } from '@angular/core'
import type {
  MyCartSetBusinessUnitAction,
  MyCustomerChangePassword,
  MyCustomerUpdate,
  MyCustomerUpdateAction,
} from '@commercetools/platform-sdk'

import { AuthFacade } from '../../auth/state/auth.facade'
import { ApiClientBuilderService } from '../../core/services/api-client-builder.service'

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private authFacade = inject(AuthFacade)
  private apiClientBuilderService = inject(ApiClientBuilderService)
}
