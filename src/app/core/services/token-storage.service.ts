import { inject, Injectable } from '@angular/core'
import type { TokenCache, TokenStore } from '@commercetools/sdk-client-v2'

import { FlowTokenType } from '../../shared/enums/token-type.enum'
import type { AuthTokenStore } from '../../shared/models/token-type.interface'
import { LocalStorage } from './storage.service'

const TOKEN_STORAGE_KEY = 'ct-anonymous-token'

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService implements TokenCache {
  private ls = inject(LocalStorage)
  private currentToken: AuthTokenStore | undefined = this.ls.getField<AuthTokenStore>(TOKEN_STORAGE_KEY) ?? undefined
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  private flowTokenType: FlowTokenType = this.currentToken?.flowTokenType
    ? this.currentToken?.flowTokenType
    : FlowTokenType.anonymous

  set tokenType(flowTokenType: FlowTokenType) {
    this.currentToken = this.flowTokenType === flowTokenType ? this.currentToken : undefined
    this.flowTokenType = flowTokenType
  }

  get tokenType(): FlowTokenType {
    return this.flowTokenType
  }

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

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return {} as TokenStore
  }

  set = (token: TokenStore): TokenStore => {
    this.currentToken = { ...token, flowTokenType: this.flowTokenType }
    this.ls.setField(TOKEN_STORAGE_KEY, this.currentToken)

    return token
  }
}
