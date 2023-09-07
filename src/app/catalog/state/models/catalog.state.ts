import type { Product } from '@commercetools/platform-sdk'

export interface CatalogState {
  products: Product[] | undefined
}
