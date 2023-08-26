import { inject, Injectable } from '@angular/core'
import type { Customer, MyCustomerDraft, Project } from '@commercetools/platform-sdk'
import type { Observable } from 'rxjs'
import { fromPromise } from 'rxjs/internal/observable/innerFrom'
import { map } from 'rxjs/operators'

import { ApiClientBuilderService } from '../../core/services/api-client-builder.service'
import type { CustomerCredential } from '../../shared/models/user-data.inteface'

@Injectable({
  providedIn: 'root',
})
export class AuthHttpService {
  private apiClientBuilderService: ApiClientBuilderService = inject(ApiClientBuilderService)

  public login = (customerCredential: CustomerCredential): Observable<Customer> => {
    const api = this.apiClientBuilderService.createApiClientWithPasswordFlow(customerCredential)
    this.apiClientBuilderService.apiWithPasswordFlow = api

    return fromPromise(
      this.apiClientBuilderService.apiWithPasswordFlow
        .me()
        .login()
        .post({
          body: { email: customerCredential.username, password: customerCredential.password },
        })
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
      this.apiClientBuilderService.apiWithPasswordFlow
        .me()
        .signup()
        .post({
          body: customerDraft,
        })
        .execute(),
    ).pipe(map(({ body }) => body.customer))
  }

  public getCustomer(): Observable<Customer> {
    return fromPromise(this.apiClientBuilderService.getApi.me().get().execute()).pipe(map(({ body }) => body))
  }

  public refreshCustomer(): Observable<Customer> {
    this.apiClientBuilderService.setApi = this.apiClientBuilderService.createApiClientWithRefreshedToken()

    return this.getCustomer()
  }

  public makeAnonymousCustomer(): Observable<Project> {
    this.apiClientBuilderService.setApi = this.apiClientBuilderService.createApiClientWithAnonymousFlow()

    return fromPromise(this.apiClientBuilderService.getApi.get().execute()).pipe(map(({ body }) => body))
  }
}
