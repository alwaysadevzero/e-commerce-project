import { inject, Injectable } from '@angular/core'
import type { Address, MyCustomerDraft } from '@commercetools/platform-sdk'
import { Actions, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { map } from 'rxjs'

import type {
  CustomerAddress,
  CustomerCredential,
  CustomerDetails,
  PasswordCredential,
} from '../../../shared/models/customer-data.interface'
import { LoadStatus } from '../../enums/load.enum'
import { customerActions } from './customer.actions'
import { selectCustomer, selectErrorMessage, selectLoadStatus } from './customer.selector'

@Injectable({
  providedIn: 'root',
})
export class CustomerFacade {
  private store$ = inject(Store)
  private actions$ = inject(Actions)
  public customer$ = this.store$.select(selectCustomer)
  public errorMessage$ = this.store$.select(selectErrorMessage)
  public customerLoadStatus$ = this.store$.select(selectLoadStatus)

  public customerSucceedRemoveAddress$ = this.actions$.pipe(
    ofType(customerActions.removeAddressSuccess),
    map(() => true),
  )

  public defaultBillingAddress$ = this.customer$.pipe(map(customer => customer?.defaultBillingAddressId))
  public defaultShippingAddress$ = this.customer$.pipe(map(customer => customer?.defaultShippingAddressId))

  public customerSucceedAddAddress$ = this.actions$.pipe(
    ofType(customerActions.addAddressSuccess),
    map(() => true),
  )

  public customerIsLoaded$ = this.store$
    .select(selectLoadStatus)
    .pipe(map(userStatus => userStatus === LoadStatus.loaded))

  public customerIsLoading$ = this.store$
    .select(selectLoadStatus)
    .pipe(map(userStatus => userStatus === LoadStatus.loading))

  public passwordChanged$ = this.actions$.pipe(
    ofType(customerActions.changePasswordCustomerSuccess),
    map(() => true),
  )

  public detailsUpdated$ = this.actions$.pipe(
    ofType(customerActions.updateDetailsSuccess),
    map(() => true),
  )

  public addresses$ = this.customer$.pipe(map(customer => customer?.addresses))

  public clearErrorMessage(): void {
    this.store$.dispatch(customerActions.clearErrorMessage())
  }

  public initCustomerState(): void {
    this.store$.dispatch(customerActions.initCustomerState())
  }

  public loginCustomer(customer: CustomerCredential): void {
    this.store$.dispatch(customerActions.loginCustomer(customer))
  }

  public registerCustomer(customerDraft: MyCustomerDraft): void {
    this.store$.dispatch(customerActions.registerCustomer(customerDraft))
  }

  public logoutCustomer(): void {
    this.store$.dispatch(customerActions.logoutCustomer())
  }

  public customerChangePassword(passwordCredential: PasswordCredential): void {
    this.store$.dispatch(customerActions.changePasswordCustomer(passwordCredential))
  }

  public updateDetails(customerDetails: CustomerDetails): void {
    this.store$.dispatch(customerActions.updateDetails(customerDetails))
  }

  public changeAddress(customerAddress: CustomerAddress): void {
    this.store$.dispatch(customerActions.changeAddress(customerAddress))
  }

  public removeAddress(addressId: string): void {
    this.store$.dispatch(customerActions.removeAddress(addressId))
  }

  public addAddress(address: Address): void {
    this.store$.dispatch(customerActions.addAddress(address))
  }

  public setDefaultBillingAddress(addressId: string): void {
    this.store$.dispatch(customerActions.setDefaultBillingAddress(addressId))
  }

  public setDefaultShippingAddress(addressId: string): void {
    this.store$.dispatch(customerActions.setDefaultShippingAddress(addressId))
  }
}
