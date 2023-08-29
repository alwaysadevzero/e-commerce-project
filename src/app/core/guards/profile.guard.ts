import { inject } from '@angular/core'
import { type CanMatchFn } from '@angular/router'
import { map, mergeMap } from 'rxjs/operators'

import { AuthFacade } from '../../auth/state/auth.facade'

export const profileGuardFn: CanMatchFn = () => {
  const authFacade = inject(AuthFacade)

  return authFacade.customerIsLoading$.pipe(
    mergeMap(() => authFacade.customerIsLoaded$),
    map(isLoaded => isLoaded),
  )
}
