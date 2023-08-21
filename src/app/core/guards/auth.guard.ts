import { inject, Injectable } from '@angular/core'
import { type CanActivateFn, Router } from '@angular/router'
import type { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'

import { LoadStatus } from '../../auth/enums/load.enum'
import { AuthFacade } from '../../auth/state/auth.facade'

@Injectable()
export class AuthGuard {
  private authFacade: AuthFacade = inject(AuthFacade)
  private router: Router = inject(Router)

  public canActivate: CanActivateFn = (): Observable<boolean> => {
    return this.authFacade.userLoadStatus$.pipe(
      map(userStatus => userStatus === LoadStatus.notLoaded),
      tap(userStatus => {
        if (!userStatus) {
          void this.router.navigateByUrl('main')
        }
      }),
    )
  }
}
