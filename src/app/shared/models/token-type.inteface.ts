import type { TokenStore } from '@commercetools/sdk-client-v2'

import type { FlowTokenType } from 'src/app/shared/enums/token-type.enum'

export interface AuthTokenStore extends TokenStore {
  flowTokenType: FlowTokenType
}
