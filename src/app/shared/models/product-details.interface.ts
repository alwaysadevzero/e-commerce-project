import type { Image, Price } from '@commercetools/platform-sdk'

export interface ProductCardDetails {
  key: string | undefined
  name: string
  description: string
  images: Image[] | undefined
  price: Price | undefined
}
