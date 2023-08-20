import { inject, Injectable } from '@angular/core'
import { Router } from '@angular/router'
import type { Customer } from '@commercetools/platform-sdk'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap, tap } from 'rxjs/operators'

import { ApiClientBuilderService } from '../../core/services/api-client-builder.service'
import { AuthHttpService } from '../services/auth.service'
import { loadUserFailure, loadUserSuccess, loginUser, signupUser } from './auth.actions'

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions)
  private authHttpService: AuthHttpService = inject(AuthHttpService)
  private apiClientBuilderService: ApiClientBuilderService = inject(ApiClientBuilderService)
  private router: Router = inject(Router)

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser),
      switchMap(({ user }) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        this.authHttpService.login(user).pipe(
          map((customer: Customer) => loadUserSuccess({ customer })),
          tap(() => {
            this.apiClientBuilderService.setApi = this.apiClientBuilderService.apiWithPasswordFlow
          }),
          catchError((error: string) => of(loadUserFailure({ errorMessage: error }))),
        ),
      ),
    ),
  )

  signupUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signupUser),
      switchMap(({ customerDraft }) =>
        this.authHttpService.signup(customerDraft).pipe(
          map((customer: Customer) => loadUserSuccess({ customer })),
          tap(() => {
            this.apiClientBuilderService.setApi = this.apiClientBuilderService.apiWithPasswordFlow
          }),
          catchError((error: string) => of(loadUserFailure({ errorMessage: error }))),
        ),
      ),
    ),
  )

  redirectAfterLoadUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadUserSuccess),
        tap(() => {
          void this.router.navigateByUrl('main')
        }),
      ),
    { dispatch: false },
  )
}
