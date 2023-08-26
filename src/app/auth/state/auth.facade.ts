import { inject, Injectable } from '@angular/core'
import type { MyCustomerDraft } from '@commercetools/platform-sdk'
import { Store } from '@ngrx/store'
import { map } from 'rxjs'

import type { CustomerCredential } from '../../shared/models/user-data.inteface'
import { LoadStatus } from '../enums/load.enum'
import { authActions } from './auth.actions'
import { selectCustomer, selectErrorMessage, selectLoadStatus } from './auth.selector'

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  private store$ = inject(Store)

  public customer$ = this.store$.select(selectCustomer)
  public errorMessage$ = this.store$.select(selectErrorMessage)
  public customerLoadStatus$ = this.store$.select(selectLoadStatus)
  public customerIsLoaded$ = this.store$
    .select(selectLoadStatus)
    .pipe(map(userStatus => userStatus === LoadStatus.loaded))
  public customerIsLoading$ = this.store$
    .select(selectLoadStatus)
    .pipe(map(userStatus => userStatus === LoadStatus.loading))

  public loginCustomer(customer: CustomerCredential): void {
    this.store$.dispatch(authActions.loginCustomer(customer))
  }

  public registerCustomer(customerDraft: MyCustomerDraft): void {
    this.store$.dispatch(authActions.registerCustomer(customerDraft))
  }

  public logoutCustomer(): void {
    this.store$.dispatch(authActions.logoutCustomer())
  }

  public clearErrorMessage(): void {
    this.store$.dispatch(authActions.clearErrorMessage())
  }

  public initCustomerState(): void {
    this.store$.dispatch(authActions.initCustomerState())
  }
}
