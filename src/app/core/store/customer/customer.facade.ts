import { inject, Injectable } from '@angular/core'
import type { MyCustomerDraft } from '@commercetools/platform-sdk'
import { Store } from '@ngrx/store'
import { map } from 'rxjs'

import { LoadStatus } from '../../enums/load.enum'
import { customerActions } from './customer.actions'
import { selectCustomer, selectErrorMessage, selectLoadStatus } from './customer.selector'

@Injectable({
  providedIn: 'root',
})
export class CustomerFacade {
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

  public clearErrorMessage(): void {
    this.store$.dispatch(customerActions.clearErrorMessage())
  }

  public initCustomerState(): void {
    this.store$.dispatch(customerActions.initCustomerState())
  }
}
