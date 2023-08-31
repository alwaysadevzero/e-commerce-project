import { inject, Injectable } from '@angular/core'
import { Router } from '@angular/router'
import type { Customer } from '@commercetools/platform-sdk'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, retry, switchMap } from 'rxjs/operators'

import { ApiClientBuilderService } from '../../core/services/api-client-builder.service'
import { TokenStorageService } from '../../core/services/token-storage.service'
import { customerActions } from '../../core/store/customer/customer.actions'
import { FlowTokenType } from '../../shared/enums/token-type.enum'
import { AuthHttpService } from '../services/auth.service'
import { authActions } from './auth.actions'

@Injectable()
export class AuthEffects {
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

            return customerActions.loadCustomerSuccess(customer)
          }),
          catchError((errorMessage: string) => of(customerActions.loadCustomerFailure(errorMessage))),
        ),
      ),
    ),
  )

  reLoginCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.reloginCustomer),
      switchMap(({ customerCredential }) =>
        this.authHttpService.login(customerCredential).pipe(
          map((customer: Customer) => {
            this.apiClientBuilderService.setApi = this.apiClientBuilderService.apiWithPasswordFlow

            return customerActions.loadCustomerSuccess(customer)
          }),
          catchError((errorMessage: string) => of(customerActions.loadCustomerFailure(errorMessage))),
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

            return customerActions.loadCustomerSuccess(customer)
          }),
          catchError((errorMessage: string) => of(customerActions.loadCustomerFailure(errorMessage))),
        ),
      ),
    ),
  )

  loadAnonymousCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.loadAnonymousCustomer),
      switchMap(() =>
        this.authHttpService.makeAnonymousCustomer().pipe(
          map(() => customerActions.resetCustomerState()),
          retry(2),
          catchError((errorMessage: string) => of(customerActions.loadCustomerFailure(errorMessage))),
        ),
      ),
    ),
  )

  refreshCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.refreshCustomer),
      switchMap(() =>
        this.authHttpService.refreshCustomer().pipe(
          map((customer: Customer) => customerActions.loadCustomerSuccess(customer)),
          catchError(() => of(authActions.loadAnonymousCustomer())),
        ),
      ),
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
}
