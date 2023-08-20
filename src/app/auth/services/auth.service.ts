import { inject, Injectable } from '@angular/core'
import type { Customer, MyCustomerDraft } from '@commercetools/platform-sdk'
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
    const api = this.apiClientBuilderService.createApiClientWithPasswordFlow(user)
    this.apiClientBuilderService.apiWithPasswordFlow = api

    return fromPromise(
      this.apiClientBuilderService.getApi
        .me()
        .login()
        .post({ body: { email: user.username, password: user.password } })
        .execute(),
    ).pipe(map(({ body }) => body.customer))
  }

  public signup(customerDraft: MyCustomerDraft): Observable<Customer> {
    const api = this.apiClientBuilderService.createApiClientWithPasswordFlow({
      username: customerDraft.email,
      password: customerDraft.password,
    })
    this.apiClientBuilderService.apiWithPasswordFlow = api

    return fromPromise(
      this.apiClientBuilderService.getApi
        .me()
        .signup()
        .post({
          body: customerDraft,
        })
        .execute(),
    ).pipe(map(({ body }) => body.customer))
  }

  public logout(): Observable<Customer> {
    const api = this.apiClientBuilderService.createApiClientWithAnonymousFlow(true)
    this.apiClientBuilderService.setApi = api

    return fromPromise(api.me().get().execute()).pipe(map(({ body }) => body))
  }
}
