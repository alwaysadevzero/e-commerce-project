import { inject, Injectable } from '@angular/core'
import { Router } from '@angular/router'
import type { Customer } from '@commercetools/platform-sdk'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap, tap } from 'rxjs/operators'

import { ApiClientBuilderService } from '../../core/services/api-client-builder.service'
import { TokenStorageService } from '../../core/services/token-storage.service'
import { AuthHttpService } from '../services/auth.service'
import {
  initUserState,
  loadUserFailure,
  loadUserSuccess,
  loginUser,
  logoutUser,
  logoutUserSuccess,
  signupUser,
} from './auth.actions'

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions)
  private tokenStorageService: TokenStorageService = inject(TokenStorageService)
  private authHttpService: AuthHttpService = inject(AuthHttpService)
  private apiClientBuilderService: ApiClientBuilderService = inject(ApiClientBuilderService)
  private router: Router = inject(Router)

  initUserState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initUserState),
      switchMap(() =>
        this.authHttpService.getProject().pipe(
          map((customer: Customer) => loadUserSuccess({ customer })),
          catchError(() => {
            this.tokenStorageService.currentToken = undefined
            this.apiClientBuilderService.setApi = this.apiClientBuilderService.createApiClientWithAnonymousFlow()

            return this.authHttpService
              .getProject()
              .pipe(map((retryCustomer: Customer) => loadUserSuccess({ customer: retryCustomer })))
          }),
        ),
      ),
    ),
  )

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser),
      switchMap(({ user }) =>
        this.authHttpService.login(user).pipe(
          map((customer: Customer) => loadUserSuccess({ customer })),
          tap(() => {
            this.tokenStorageService.currentToken = undefined
            this.apiClientBuilderService.setApi = this.apiClientBuilderService.apiWithPasswordFlow
            this.authHttpService.getProject()
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
            this.tokenStorageService.currentToken = undefined
            this.apiClientBuilderService.setApi = this.apiClientBuilderService.apiWithPasswordFlow
            this.authHttpService.getProject()
          }),
          catchError((error: string) => of(loadUserFailure({ errorMessage: error }))),
        ),
      ),
    ),
  )

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutUser),
      switchMap(() =>
        this.authHttpService.logout().pipe(
          map(() => logoutUserSuccess()),
          tap(() => {
            this.tokenStorageService.clearToken()

            this.apiClientBuilderService.setApi = this.apiClientBuilderService.createApiClientWithAnonymousFlow()
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
