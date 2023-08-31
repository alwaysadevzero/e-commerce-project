import { inject, Injectable } from '@angular/core'
import type { Customer, MyCustomerChangePassword, MyCustomerUpdate } from '@commercetools/platform-sdk'
import { distinctUntilChanged, filter, map, type Observable, tap } from 'rxjs'
import { fromPromise } from 'rxjs/internal/observable/innerFrom'

import { AuthFacade } from '../../auth/state/auth.facade'
import { ApiClientBuilderService } from '../../core/services/api-client-builder.service'
import { TokenStorageService } from '../../core/services/token-storage.service'

@Injectable({
  providedIn: 'root',
})
export class ProfileHttpService {
  private authFacade = inject(AuthFacade)
  private apiClientBuilderService = inject(ApiClientBuilderService)
  private tokenStorageService = inject(TokenStorageService)

  public changePassword(myCustomerChangePassword: MyCustomerChangePassword): Observable<Customer> {
    return fromPromise(
      this.apiClientBuilderService.getApi
        .me()
        .password()
        .post({
          body: myCustomerChangePassword,
        })
        .execute(),
    ).pipe(map(({ body }) => body))
  }
}
