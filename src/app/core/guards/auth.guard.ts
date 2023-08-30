import { inject } from '@angular/core'
import { type CanMatchFn, Router } from '@angular/router'
import { filter, map, mergeMap } from 'rxjs/operators'

import { CustomerFacade } from '../store/customer/customer.facade'

export const authGuardFn: CanMatchFn = () => {
  const router = inject(Router)
  const customerFacade = inject(CustomerFacade)

  return customerFacade.customerIsLoading$.pipe(
    filter(isLoading => !isLoading),
    mergeMap(() => customerFacade.customerIsLoaded$),
    map(isLoaded => {
      if (isLoaded) {
        router.navigateByUrl('main').catch(error => {
          if (error instanceof Error) {
            return error.message
          }

          return null
        })
      }

      return true
    }),
  )
}
