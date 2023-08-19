import { inject, Injectable } from '@angular/core'
import type { Customer, CustomerSignInResult, MyCustomerDraft, Project } from '@commercetools/platform-sdk'
import type { Observable } from 'rxjs'
import { fromPromise } from 'rxjs/internal/observable/innerFrom'
import { map } from 'rxjs/operators'

import { ApiClientBuilderService } from '../../core/services/api-client-builder.service'
import type { User } from '../../shared/models/user-data'

@Injectable({
  providedIn: 'root',
})
export class AuthHttpService {
  private apiClientBuilderService: ApiClientBuilderService = inject(ApiClientBuilderService)
  public login = (user: User): Observable<Customer> => {
    this.apiClientBuilderService.user = user

    return fromPromise(
      this.apiClientBuilderService
        .createApiClientWithPasswordFlow(user)
        .me()
        .login()
        .post({ body: { email: user.username, password: user.password } })
        .execute(),
    ).pipe(map(({ body }) => body.customer))
  }

  public signup(customer: MyCustomerDraft): Observable<Customer> {
    return fromPromise(
      this.apiClientBuilderService.getApi
        .me()
        .signup()
        .post({
          body: customer,
        })
        .execute(),
    ).pipe(map(({ body }) => body.customer))
  }
}
