import { inject } from '@angular/core'
import type { MyCustomerDraft } from '@commercetools/platform-sdk'
import { Store } from '@ngrx/store'

import type { User } from '../../shared/models/user-data'
import { clearErrorMessage, loginUser, signupUser } from './auth.actions'
import { selectErrorMessage, selectIsLoading, selectUser } from './auth.selector'

export class AuthFacade {
  private store$ = inject(Store)

  public user$ = this.store$.select(selectUser)
  public errorMessage$ = this.store$.select(selectErrorMessage)
  public userIsLoading$ = this.store$.select(selectIsLoading)

  public loginUser(user: User): void {
    this.store$.dispatch(loginUser({ user }))
  }

  public signupUser(customerDraft: MyCustomerDraft): void {
    this.store$.dispatch(signupUser({ customerDraft }))
  }

  public clearErrorMessage(): void {
    this.store$.dispatch(clearErrorMessage())
  }
}
