import { inject, Injectable } from '@angular/core'
import type { TokenCache, TokenStore } from '@commercetools/sdk-client-v2'

import { LocalStorage } from './storage.service'

const TOKEN_STORAGE_KEY = 'ct-anonymous-token'

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService implements TokenCache {
  private ls = inject(LocalStorage)
  public currentToken: TokenStore | undefined = this.ls.getField<TokenStore>(TOKEN_STORAGE_KEY) ?? undefined

  get refreshToken(): string | undefined {
    if (this.currentToken) {
      return this.currentToken?.refreshToken
    }

    return undefined
  }

  clearToken = (): void => {
    this.currentToken = undefined
    this.ls.removeField(TOKEN_STORAGE_KEY)
  }

  get = (): TokenStore => {
    if (this.currentToken) {
      return this.currentToken
    }

    return {
      token: '',
      expirationTime: 0,
    }
  }

  set = (token: TokenStore): TokenStore => {
    this.currentToken = token
    this.ls.setField(TOKEN_STORAGE_KEY, token)

    return token
  }
}
