import { inject, Injectable } from '@angular/core'
import type { MyCustomerDraft } from '@commercetools/platform-sdk'
import { Store } from '@ngrx/store'
import { map } from 'rxjs'

import type { CustomerCredential, PasswordCredential } from '../../shared/models/customer-data.interface'
import { profileActions } from './proflie.actions'

@Injectable({
  providedIn: 'root',
})
export class ProfileFacade {
  private store$ = inject(Store)

  public customerChangePassword(passwordCredential: PasswordCredential): void {
    this.store$.dispatch(profileActions.changePassword(passwordCredential))
  }
}
