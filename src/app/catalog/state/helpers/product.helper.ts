import { Injectable } from '@angular/core'
import type { Product } from '@commercetools/platform-sdk'

import type { ProductCardDetails } from 'src/app/shared/models/product-details.interface'

@Injectable({
  providedIn: 'root',
})
export class ProductHelper {
  public getProductsCardDetails(products: Product[]): ProductCardDetails[] {
    return products.map(product => ({
      key: product.key,
      name: product.masterData.current.name['en-US'],
      price: product.masterData.current.masterVariant.prices
        ? product.masterData.current.masterVariant.prices[0]
        : undefined,
      description: product.masterData.current.description ? product.masterData.current.description['en-US'] : '',
      images: product.masterData.current.masterVariant.images,
    }))
  }
}
