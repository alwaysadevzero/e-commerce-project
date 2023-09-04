
import { inject, Injectable } from '@angular/core'
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import { type ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder'
import { ClientBuilder } from '@commercetools/sdk-client-v2'

import { environment } from '../../../environments/environment'
import type { CustomerCredential } from '../../shared/models/user-data.inteface'
import { Options } from '../helpers/option-helper'
import { TokenStorageService } from './token-storage.service'

@Injectable({
  providedIn: 'root',
})
export class ApiClientBuilderService {
  private tokenStorageService = inject(TokenStorageService)
  private api!: ByProjectKeyRequestBuilder
  public apiWithPasswordFlow!: ByProjectKeyRequestBuilder

  private options = new Options(this.tokenStorageService)

  public get getApi(): ByProjectKeyRequestBuilder {
    return this.api
  }

  public set setApi(api: ByProjectKeyRequestBuilder) {
    this.api = api
  }

  private createApiClient(builder: ClientBuilder): ByProjectKeyRequestBuilder {
    return createApiBuilderFromCtpClient(
      builder.withHttpMiddleware(this.options.getHttpMiddlewareOptions()).build(),
    ).withProjectKey({
      projectKey: environment.PROJECT_KEY,
    })
  }

  public createApiClientWithPasswordFlow(customer: CustomerCredential): ByProjectKeyRequestBuilder {
    const builder = new ClientBuilder().withPasswordFlow(this.options.getPasswordAuthMiddlewareOptions(customer))

    return this.createApiClient(builder)
  }

  public createApiClientWithAnonymousFlow(): ByProjectKeyRequestBuilder {
    const builder = new ClientBuilder().withAnonymousSessionFlow(this.options.getAnonymousAuthMiddlewareOptions())

    return this.createApiClient(builder)
  }

  public createApiClientWithRefreshedToken(token?: string): ByProjectKeyRequestBuilder {
    const builder = new ClientBuilder().withRefreshTokenFlow(this.options.getRefreshAuthMiddlewareOptions(token))

    return this.createApiClient(builder)
  }
}
