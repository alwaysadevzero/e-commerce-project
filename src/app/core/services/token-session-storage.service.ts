import { Injectable } from '@angular/core'
import type { TokenCache, TokenCacheOptions, TokenStore } from '@commercetools/sdk-client-v2'

const ANONYMOUS_TOKEN_STORAGE_KEY = 'ct-anonymous-token'

@Injectable({
  providedIn: 'root',
})
export class TokenSessionStorageService {
  private currentTokenStore: TokenStore | Record<string, never> = {}

  public getRefreshToken(): string | undefined {
    if ('token' in this.currentTokenStore && typeof this.currentTokenStore.token == 'string') {
      return this.currentTokenStore.refreshToken
    }

    return undefined
  }

  public getTokenCache(): TokenCache {
    return {
      get: (tokenCacheOptions?: TokenCacheOptions) => {
        this.currentTokenStore = this.getTokenFromSessionStorage()

        if (this.isTokenStore(this.currentTokenStore)) {
          return this.currentTokenStore
        }

        return {
          token: '',
          expirationTime: 0,
        }
      },
      set: (newTokenStore: TokenStore) => {
        this.currentTokenStore = newTokenStore
        sessionStorage.setItem(ANONYMOUS_TOKEN_STORAGE_KEY, JSON.stringify(this.currentTokenStore))

        return newTokenStore
      },
    }
  }
  private getTokenFromSessionStorage(): TokenStore | Record<string, never> {
    const storedValue = sessionStorage.getItem(ANONYMOUS_TOKEN_STORAGE_KEY)

    if (storedValue) {
      const parsed: TokenStore | undefined = JSON.parse(storedValue) as TokenStore | undefined

      if (parsed && this.isTokenStore(parsed) && parsed.expirationTime >= Date.now()) {
        return parsed
      }
    }

    sessionStorage.removeItem(ANONYMOUS_TOKEN_STORAGE_KEY)

    return {}
  }

  private isTokenStore(obj: object): obj is TokenStore {
    return obj && 'expirationTime' in obj
  }
}
