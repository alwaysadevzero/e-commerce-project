import { inject, Injectable } from '@angular/core'
import type { CanActivateFn } from '@angular/router'
import type { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { LoadStatus } from '../../auth/enums/load.enum'
import { AuthFacade } from '../../auth/state/auth.facade'

@Injectable()
export class AuthGuard {
  private authFacade: AuthFacade = inject(AuthFacade)

  public canActivate: CanActivateFn = (): Observable<boolean> => {
    return this.authFacade.userLoadStatus$.pipe(map(status => status !== LoadStatus.loaded))
  }
}
