import { inject, Injectable } from '@angular/core'
import type { MyCustomerDraft } from '@commercetools/platform-sdk'
import { Store } from '@ngrx/store'

import type { User } from '../../shared/models/user-data'
import { clearErrorMessage, initUserState, loginUser, logoutUser, signupUser } from './auth.actions'
import { selectErrorMessage, selectLoadStatus, selectUser } from './auth.selector'

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  private store$ = inject(Store)

  public user$ = this.store$.select(selectUser)
  public errorMessage$ = this.store$.select(selectErrorMessage)
  public userLoadStatus$ = this.store$.select(selectLoadStatus)

  public loginUser(user: User): void {
    this.store$.dispatch(loginUser({ user }))
  }

  public signupUser(customerDraft: MyCustomerDraft): void {
    this.store$.dispatch(signupUser({ customerDraft }))
  }

  public logout(): void {
    this.store$.dispatch(logoutUser())
  }

  public clearErrorMessage(): void {
    this.store$.dispatch(clearErrorMessage())
  }

  public initUserState(): void {
    this.store$.dispatch(initUserState())
  }
}
