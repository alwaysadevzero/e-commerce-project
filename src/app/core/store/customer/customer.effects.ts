import { inject, Injectable } from '@angular/core'
import { Router } from '@angular/router'
import type { Customer } from '@commercetools/platform-sdk'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, filter, first, map, retry, switchMap } from 'rxjs/operators'

import { FlowTokenType } from '../../../shared/enums/token-type.enum'
import { TokenStorageService } from '../../services/token-storage.service'
import { customerActions } from './customer.actions'
import { CustomerFacade } from './customer.facade'
import { AuthHttpService } from './services/auth-customer.service'
import { ProfileHttpService } from './services/profile-customer.service'

@Injectable()
export class CustomerEffects {
  private actions$ = inject(Actions)
  private tokenStorageService = inject(TokenStorageService)
  private authHttpService = inject(AuthHttpService)
  private profileHttpService = inject(ProfileHttpService)
  private router = inject(Router)
  private customerFacade = inject(CustomerFacade)

  initCustomerState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(customerActions.initCustomerState),
      switchMap(() =>
        this.tokenStorageService.tokenType === FlowTokenType.refresh
          ? of(customerActions.refreshCustomer())
          : of(customerActions.loadAnonymousCustomer()),
      ),
    ),
  )

  loginCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(customerActions.loginCustomer),
      switchMap(({ customerCredential }) =>
        this.authHttpService.login(customerCredential).pipe(
          map((customer: Customer) => {
            this.authHttpService.setDefaultApiPasswordFlow()
            this.router.navigateByUrl('main').catch(error => {
              throw error
            })

            return customerActions.loginCustomerSuccess(customer)
          }),
          catchError((errorMessage: string) => of(customerActions.loginCustomerFailure(errorMessage))),
        ),
      ),
    ),
  )

  reLoginCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(customerActions.reloginCustomer),
      switchMap(({ customerCredential }) =>
        this.authHttpService.login(customerCredential).pipe(
          map((customer: Customer) => {
            this.authHttpService.setDefaultApiPasswordFlow()

            return customerActions.reloginCustomerSuccsess(customer)
          }),
          catchError((errorMessage: string) => of(customerActions.refreshCustomerFailure(errorMessage))),
        ),
      ),
    ),
  )

  registerCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(customerActions.registerCustomer),
      switchMap(({ customerDraft }) =>
        this.authHttpService.register(customerDraft).pipe(
          map((customer: Customer) => {
            this.authHttpService.setDefaultApiPasswordFlow()
            this.router.navigateByUrl('main').catch(error => {
              throw error
            })

            return customerActions.registerCustomerSuccsess(customer)
          }),
          catchError((errorMessage: string) => of(customerActions.registerCustomerFailure(errorMessage))),
        ),
      ),
    ),
  )

  loadAnonymousCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(customerActions.loadAnonymousCustomer),
      switchMap(() =>
        this.authHttpService.makeAnonymousCustomer().pipe(
          map(() => customerActions.loadAnonymousCustomerSuccess()),
          retry(2),
          catchError((errorMessage: string) => of(customerActions.loadAnonymousCustomerFailure(errorMessage))),
        ),
      ),
    ),
  )

  refreshCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(customerActions.refreshCustomer),
      switchMap(() =>
        this.authHttpService.refreshCustomer().pipe(
          map((customer: Customer) => customerActions.refreshCustomerSuccsess(customer)),
          catchError((errorMessage: string) => of(customerActions.refreshCustomerFailure(errorMessage))),
        ),
      ),
    ),
  )

  logoutCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(customerActions.logoutCustomer, customerActions.refreshCustomerFailure),
      switchMap(() => {
        this.router.navigateByUrl('main').catch(error => {
          throw error
        })

        return of(customerActions.loadAnonymousCustomer())
      }),
    ),
  )

  anonymousCustomerFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(customerActions.loadAnonymousCustomerFailure),
      switchMap(() => {
        return of(customerActions.resetCustomerState())
      }),
    ),
  )

  customerChangePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(customerActions.changePasswordCustomer),
      switchMap(({ passwordCredential }) =>
        this.customerFacade.customer$.pipe(
          filter((customer): customer is Customer => customer !== null),
          first(),
          switchMap((customer: Customer) =>
            this.profileHttpService.changePassword({ ...passwordCredential, version: customer.version }).pipe(
              switchMap(() =>
                of(
                  customerActions.changePasswordCustomerSuccess({
                    username: customer.email,
                    password: passwordCredential.newPassword,
                  }),
                ),
              ),
              catchError((errorMessage: string) => of(customerActions.changePasswordCustomerFailure(errorMessage))),
            ),
          ),
        ),
      ),
    ),
  )

  customerChangePasswordSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(customerActions.changePasswordCustomerSuccess),
      map(({ customerCredential }) => {
        this.tokenStorageService.clearToken()

        return customerActions.reloginCustomer(customerCredential)
      }),
    ),
  )

  customerUpdateDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(customerActions.updateDetails),
      switchMap(({ customerDetails }) =>
        this.customerFacade.customer$.pipe(
          filter((customer): customer is Customer => customer !== null),
          first(),
          switchMap((customer: Customer) =>
            this.profileHttpService.updateDetails(customer.version, customerDetails).pipe(
              map(updatedCustomer => customerActions.updateDetailsSuccess(updatedCustomer)),
              catchError((errorMessage: string) => of(customerActions.updateDetailsFailure(errorMessage))),
            ),
          ),
        ),
      ),
    ),
  )
  customerChangeAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(customerActions.changeAddress),
      switchMap(({ customerAddress }) =>
        this.customerFacade.customer$.pipe(
          filter((customer): customer is Customer => customer !== null),
          first(),
          switchMap((customer: Customer) =>
            this.profileHttpService.changeAddress(customer.version, customerAddress).pipe(
              map(updatedCustomer => customerActions.changeAddressSuccess(updatedCustomer)),
              catchError((errorMessage: string) => of(customerActions.changeAddressFailure(errorMessage))),
            ),
          ),
        ),
      ),
    ),
  )

  customerRemoveAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(customerActions.removeAddress),
      switchMap(({ addressId }) =>
        this.customerFacade.customer$.pipe(
          filter((customer): customer is Customer => customer !== null),
          first(),
          switchMap((customer: Customer) =>
            this.profileHttpService.removeAddress(customer.version, addressId).pipe(
              map(updatedCustomer => customerActions.removeAddressSuccess(updatedCustomer)),
              catchError((errorMessage: string) => of(customerActions.removeAddressFailure(errorMessage))),
            ),
          ),
        ),
      ),
    ),
  )

  customerAddAddress = createEffect(() =>
    this.actions$.pipe(
      ofType(customerActions.addAddress),
      switchMap(({ address }) =>
        this.customerFacade.customer$.pipe(
          filter((customer): customer is Customer => customer !== null),
          first(),
          switchMap((customer: Customer) =>
            this.profileHttpService.addAddress(customer.version, address).pipe(
              map(updatedCustomer => customerActions.addAddressSuccess(updatedCustomer)),
              catchError((errorMessage: string) => of(customerActions.addAddressFailure(errorMessage))),
            ),
          ),
        ),
      ),
    ),
  )

  customerSetDefaultShippingAddress = createEffect(() =>
    this.actions$.pipe(
      ofType(customerActions.setDefaultShippingAddress),
      switchMap(({ addressId }) =>
        this.customerFacade.customer$.pipe(
          filter((customer): customer is Customer => customer !== null),
          first(),
          switchMap((customer: Customer) =>
            this.profileHttpService.setDefaultShippingAddress(customer.version, addressId).pipe(
              map(updatedCustomer => customerActions.setDefaultShippingAddressSuccess(updatedCustomer)),
              catchError((errorMessage: string) => of(customerActions.setDefaultShippingAddressFailure(errorMessage))),
            ),
          ),
        ),
      ),
    ),
  )

  customerSetDefaultBillingAddress = createEffect(() =>
    this.actions$.pipe(
      ofType(customerActions.setDefaultBillingAddress),
      switchMap(({ addressId }) =>
        this.customerFacade.customer$.pipe(
          filter((customer): customer is Customer => customer !== null),
          first(),
          switchMap((customer: Customer) =>
            this.profileHttpService.setDefaultBillingAddress(customer.version, addressId).pipe(
              map(updatedCustomer => customerActions.setDefaultBillingAddressSuccess(updatedCustomer)),
              catchError((errorMessage: string) => of(customerActions.setDefaultBillingAddressFailure(errorMessage))),
            ),
          ),
        ),
      ),
    ),
  )
}
