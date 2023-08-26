import { inject, Injectable } from '@angular/core'
import { Router } from '@angular/router'
import type { Customer } from '@commercetools/platform-sdk'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, retry, switchMap } from 'rxjs/operators'

import { ApiClientBuilderService } from '../../core/services/api-client-builder.service'
import { TokenStorageService } from '../../core/services/token-storage.service'
import { FlowTokenType } from '../../shared/enums/token-type.enum'
import { AuthHttpService } from '../services/auth.service'
import { authActions } from './auth.actions'

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions)
  private tokenStorageService: TokenStorageService = inject(TokenStorageService)
  private authHttpService: AuthHttpService = inject(AuthHttpService)
  private apiClientBuilderService: ApiClientBuilderService = inject(ApiClientBuilderService)
  private router: Router = inject(Router)

  initCustomerState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.initCustomerState),
      switchMap(() => {
        switch (this.tokenStorageService.tokenType) {
          case FlowTokenType.refresh:
            return of(authActions.refreshCustomer())

          default:
            return of(authActions.loadAnonymousCustomer())
        }
      }),
    ),
  )

  loginCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.loginCustomer),
      switchMap(({ customerCredential }) =>
        this.authHttpService.login(customerCredential).pipe(
          map((customer: Customer) => {
            this.apiClientBuilderService.setApi = this.apiClientBuilderService.apiWithPasswordFlow
            this.router.navigateByUrl('main').catch(error => {
              throw error
            })

            return authActions.loadCustomerSuccess(customer)
          }),
          catchError((errorMessage: string) => of(authActions.loadCustomerFailure(errorMessage))),
        ),
      ),
    ),
  )

  registerCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.registerCustomer),
      switchMap(({ customerDraft }) =>
        this.authHttpService.signup(customerDraft).pipe(
          map((customer: Customer) => {
            this.apiClientBuilderService.setApi = this.apiClientBuilderService.apiWithPasswordFlow
            this.router.navigateByUrl('main').catch(error => {
              throw error
            })

            return authActions.loadCustomerSuccess(customer)
          }),
          retry(2),
          catchError((errorMessage: string) => of(authActions.loadCustomerFailure(errorMessage))),
        ),
      ),
    ),
  )

  loadAnonymousCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.loadAnonymousCustomer),
      switchMap(() =>
        this.authHttpService.makeAnonymousCustomer().pipe(
          map(() => authActions.loadAnonymousCustomerSuccess()),
          catchError(error => of(authActions.loadAnonymousCustomerFailure({ errorMessage: error as string }))),
        ),
      ),
    ),
  )

  refreshCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.refreshCustomer),
      switchMap(() =>
        this.authHttpService.refreshCustomer().pipe(
          map((customer: Customer) => authActions.loadCustomerSuccess(customer)),
          catchError(() => of(authActions.refreshCustomerFailure())),
        ),
      ),
    ),
  )

  refreshCustomerFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.refreshCustomerFailure),
      switchMap(() => of(authActions.loadAnonymousCustomer())),
    ),
  )

  logoutCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.logoutCustomer),
      switchMap(() => {
        return of(authActions.loadAnonymousCustomer())
      }),
    ),
  )

  loadAnonymousUserFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.loadAnonymousCustomerFailure),
      switchMap(() => {
        this.tokenStorageService.clearToken()

        return this.authHttpService.makeAnonymousCustomer().pipe(
          map(() => authActions.loadAnonymousCustomerSuccess()),
          catchError(error => of(authActions.loadAnonymousCustomerFailure({ errorMessage: error as string }))),
        )
      }),
    ),
  )
}
