import { inject } from '@angular/core'
import { type CanMatchFn } from '@angular/router'
import { filter, map, mergeMap } from 'rxjs/operators'

import { CustomerFacade } from '../store/customer/customer.facade'

export const profileGuardFn: CanMatchFn = () => {
  const customerFacade = inject(CustomerFacade)

  return customerFacade.customerIsLoading$.pipe(
    filter(isLoading => !isLoading),
    mergeMap(() => customerFacade.customerIsLoaded$),
    map(isLoaded => isLoaded),
  )
}
