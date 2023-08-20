import {
  type AnonymousAuthMiddlewareOptions,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
  type RefreshAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2'

import { environment } from '../../../environments/environment'
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
      tokenCache: this.tokenStorage.getTokenCache(),
    }
  }

  public getPasswordAuthMiddlewareOptions(username: string, password: string): PasswordAuthMiddlewareOptions {
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
      tokenCache: this.tokenStorage.getTokenCache(),
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
    const refreshTokenToken = this.tokenStorage.getRefreshToken()

    return {
      host: environment.AUTH_URL,
      projectKey: environment.PROJECT_KEY,
      credentials: {
        clientId: environment.CLIENT_ID,
        clientSecret: environment.CLIENT_SECRET,
      },
      refreshToken: token || refreshTokenToken || '',
    }
  }

  public getAnonymousAuthMiddlewareOptions(clearToken = false): AnonymousAuthMiddlewareOptions {
    return {
      host: environment.AUTH_URL,
      projectKey: environment.PROJECT_KEY,
      credentials: {
        clientId: environment.CLIENT_ID,
        clientSecret: environment.CLIENT_SECRET,
      },
      tokenCache: clearToken ? undefined : this.tokenStorage.getTokenCache(),
    }
  }
}
