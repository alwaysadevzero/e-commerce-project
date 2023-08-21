import { Injectable } from '@angular/core'
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import { type ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder'
import { ClientBuilder } from '@commercetools/sdk-client-v2'

import { environment } from '../../../environments/environment'
import type { User } from '../../shared/models/user-data'
import { Options } from '../helpers/option-helper'
import { TokenStorageService } from './token-storage.service'

@Injectable({
  providedIn: 'root',
})
export class ApiClientBuilderService {
  private api: ByProjectKeyRequestBuilder
  public apiWithPasswordFlow!: ByProjectKeyRequestBuilder

  constructor(private tokenStorageService: TokenStorageService) {
    if (this.tokenStorageService.refreshToken) {
      this.api = this.createApiClientWithRefreshedToken()
    } else {
      this.api = this.createApiClientWithAnonymousFlow()
    }
  }

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

  public createApiClientWithPasswordFlow(user: User): ByProjectKeyRequestBuilder {
    const builder = new ClientBuilder().withPasswordFlow(
      this.options.getPasswordAuthMiddlewareOptions(user.username, user.password),
    )

    return this.createApiClient(builder)
  }

  public createApiClientWithAnonymousFlow(clearToken = false): ByProjectKeyRequestBuilder {
    const builder = new ClientBuilder().withAnonymousSessionFlow(
      this.options.getAnonymousAuthMiddlewareOptions(clearToken),
    )

    return this.createApiClient(builder)
  }

  public createApiClientWithRefreshedToken(token?: string): ByProjectKeyRequestBuilder {
    const builder = new ClientBuilder().withRefreshTokenFlow(this.options.getRefreshAuthMiddlewareOptions(token))

    return this.createApiClient(builder)
  }
}
