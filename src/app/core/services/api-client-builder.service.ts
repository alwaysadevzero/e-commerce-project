import { Injectable } from '@angular/core'
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import { type ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder'
import { ClientBuilder } from '@commercetools/sdk-client-v2'

import { environment } from '../../../environments/environment'
import { Options } from '../helpers/option-helper'
import { TokenSessionStorageService } from './token-session-storage.service'

@Injectable({
  providedIn: 'root',
})
export class ApiClientBuilderService {
  private api: ByProjectKeyRequestBuilder

  constructor(private tokenSessionStorageService: TokenSessionStorageService) {
    this.api = this.createApiClientWithAnonymousFlow()
  }

  private options = new Options(this.tokenSessionStorageService)

  public get getApi(): ByProjectKeyRequestBuilder {
    return this.api
  }

  public set setApi(api: ByProjectKeyRequestBuilder) {
    this.api = api
  }

  private createApiClient(builder: ClientBuilder): ByProjectKeyRequestBuilder {
    return createApiBuilderFromCtpClient(
      builder.withHttpMiddleware(this.options.getRttpMiddlewareOptions()).withLoggerMiddleware().build(),
    ).withProjectKey({ projectKey: environment.PROJECT_KEY })
  }

  public createApiClientWithPasswordFlow(username: string, password: string): ByProjectKeyRequestBuilder {
    const builder = new ClientBuilder().withPasswordFlow(
      this.options.getPasswordAuthMiddlewareOptions(username, password),
    )

    return this.createApiClient(builder)
  }

  public createApiClientWithAnonymousFlow(): ByProjectKeyRequestBuilder {
    const builder = new ClientBuilder().withAnonymousSessionFlow(this.options.getAnonymousAuthMiddlewareOptions())

    return this.createApiClient(builder)
  }

  public createApiClientWithRefreshedToken(token: string): ByProjectKeyRequestBuilder {
    const builder = new ClientBuilder().withRefreshTokenFlow(this.options.getRefreshAuthMiddlewareOptions(token))

    return this.createApiClient(builder)
  }
}
