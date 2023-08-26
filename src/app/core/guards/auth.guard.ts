import { inject } from '@angular/core'
import { type CanMatchFn, Router } from '@angular/router'
import { filter, map, mergeMap } from 'rxjs/operators'

import { AuthFacade } from '../../auth/state/auth.facade'

export const authGuardFn: CanMatchFn = () => {
  const router = inject(Router)
  const authFacade = inject(AuthFacade)

  return authFacade.customerIsLoading$.pipe(
    filter(isLoading => !isLoading),
    mergeMap(() => authFacade.customerIsLoaded$),
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
