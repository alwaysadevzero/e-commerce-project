import { inject, Injectable } from '@angular/core'
import type { Customer, MyCustomerDraft } from '@commercetools/platform-sdk'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'

import { ApiClientBuilderService } from '../../core/services/api-client-builder.service'
import type { User } from '../../shared/models/user-data'
import { AuthHttpService } from '../services/auth.service'
import { loadUserFailure, loadUserSuccess, loginUser, signupUser } from './auth.actions'

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions)
  private authHttpService: AuthHttpService = inject(AuthHttpService)

  loginUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginUser),
      switchMap(({ user }: { user: User }) =>
        this.authHttpService.login(user).pipe(
          map((loggedUser: Customer) => {
            return loadUserSuccess({ user: loggedUser })
          }),
          catchError((error: string) => of(loadUserFailure({ errorMessage: error }))),
        ),
      ),
    )
  })

  signupUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupUser),
      switchMap(({ customer }: { customer: MyCustomerDraft }) =>
        this.authHttpService.signup(customer).pipe(
          map((loggedUser: Customer) => {
            return loadUserSuccess({ user: loggedUser })
          }),
          catchError((error: string) => of(loadUserFailure({ errorMessage: error }))),
        ),
      ),
    )
  })
}
