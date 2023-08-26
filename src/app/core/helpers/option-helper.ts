import {
  type AnonymousAuthMiddlewareOptions,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
  type RefreshAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2'

import { environment } from '../../../environments/environment'
import { FlowTokenType } from '../../shared/enums/token-type.enum'
import type { TokenStorageService } from '../services/token-storage.service'

export class Options {
  constructor(private tokenStorage: TokenStorageService) {}

  public getAuthMiddlewareOptions(): AuthMiddlewareOptions {
    return {
      host: environment.AUTH_URL,
      projectKey: environment.PROJECT_KEY,
      credentials: {
        clientId: environment.CLIENT_ID,
        clientSecret: environment.CLIENT_SECRET,
      },
      tokenCache: this.tokenStorage,
    }
  }

  public getPasswordAuthMiddlewareOptions({
    username,
    password,
  }: {
    username: string
    password: string
  }): PasswordAuthMiddlewareOptions {
    this.tokenStorage.tokenType = FlowTokenType.refresh

    return {
      host: environment.AUTH_URL,
      projectKey: environment.PROJECT_KEY,
      credentials: {
        clientId: environment.CLIENT_ID,
        clientSecret: environment.CLIENT_SECRET,
        user: {
          username,
          password,
        },
      },
      tokenCache: this.tokenStorage,
    }
  }

  public getHttpMiddlewareOptions(): HttpMiddlewareOptions {
    return {
      host: environment.API_URL,
      includeResponseHeaders: true,
      maskSensitiveHeaderData: true,
      includeOriginalRequest: false,
      includeRequestInErrorResponse: false,
      enableRetry: true,
      retryConfig: {
        maxRetries: 3,
        retryDelay: 200,
        backoff: false,
        retryCodes: [503],
      },
    }
  }

  public getRefreshAuthMiddlewareOptions(token?: string): RefreshAuthMiddlewareOptions {
    this.tokenStorage.tokenType = FlowTokenType.refresh

    return {
      host: environment.AUTH_URL,
      projectKey: environment.PROJECT_KEY,
      credentials: {
        clientId: environment.CLIENT_ID,
        clientSecret: environment.CLIENT_SECRET,
      },
      refreshToken: token || this.tokenStorage.refreshToken || '',
    }
  }

  public getAnonymousAuthMiddlewareOptions(): AnonymousAuthMiddlewareOptions {
    this.tokenStorage.tokenType = FlowTokenType.anonymous

    return {
      host: environment.AUTH_URL,
      projectKey: environment.PROJECT_KEY,
      credentials: {
        clientId: environment.CLIENT_ID,
        clientSecret: environment.CLIENT_SECRET,
      },
      tokenCache: this.tokenStorage,
    }
  }
}
