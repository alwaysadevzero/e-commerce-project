import { inject, Injectable } from '@angular/core'
import type { MyCustomerDraft } from '@commercetools/platform-sdk'
import { Actions, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { map, mapTo } from 'rxjs'

import type { CustomerCredential, PasswordCredential } from '../../../shared/models/customer-data.interface'
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
}
