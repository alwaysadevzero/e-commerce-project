import { inject, Injectable } from '@angular/core'
import type { Customer, MyCustomerChangePassword, MyCustomerUpdate } from '@commercetools/platform-sdk'
import { distinctUntilChanged, filter, map, type Observable, tap } from 'rxjs'
import { fromPromise } from 'rxjs/internal/observable/innerFrom'

import { ApiClientBuilderService } from '../../../services/api-client-builder.service'
import { CustomerFacade } from '../customer.facade'

@Injectable({
  providedIn: 'root',
})
export class ProfileHttpService {
  private customerFacade = inject(CustomerFacade)
  private apiClientBuilderService = inject(ApiClientBuilderService)

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
