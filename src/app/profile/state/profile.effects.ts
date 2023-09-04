import { inject, Injectable } from '@angular/core'
import { Router } from '@angular/router'
import type { Customer } from '@commercetools/platform-sdk'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, filter, first, map, mergeMap, switchMap } from 'rxjs/operators'

import { AuthHttpService } from '../../auth/services/auth.service'
import { authActions } from '../../auth/state/auth.actions'
import { AuthFacade } from '../../auth/state/auth.facade'
import { ApiClientBuilderService } from '../../core/services/api-client-builder.service'
import { TokenStorageService } from '../../core/services/token-storage.service'
import { customerActions } from '../../core/store/customer/customer.actions'
import { ProfileHttpService } from '../services/profile.service'
import { profileActions } from './proflie.actions'

@Injectable()
export class ProfileEffects {
  private actions$ = inject(Actions)
  private authHttpService = inject(AuthHttpService)
  private apiClientBuilderService = inject(ApiClientBuilderService)
  private router = inject(Router)
  private authFacade = inject(AuthFacade)
  private profileHttpService = inject(ProfileHttpService)
  private tokenStorage = inject(TokenStorageService)

  customerChangePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.changePassword),
      switchMap(({ passwordCredential }) =>
        this.authFacade.customer$.pipe(
          filter((customer): customer is Customer => customer !== null),
          first(),
          switchMap((customer: Customer) =>
            this.profileHttpService.changePassword({ ...passwordCredential, version: customer.version }),
          ),
          map((customer: Customer) => {
            this.tokenStorage.clearToken()

            return authActions.reloginCustomer({ username: customer.email, password: passwordCredential.newPassword })
          }),
          catchError((errorMessage: string) => of(profileActions.changePasswordFailure(errorMessage))),
        ),
      ),
    ),
  )

  changePasswordFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.changePasswordFailure),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      mergeMap(({ errorMessage }) => of(customerActions.setErrorMessage(errorMessage))),
    ),
  )
}
