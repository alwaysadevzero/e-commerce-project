import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { filter, map } from 'rxjs'

import type { ProductCardDetails } from '../shared/models/product-details.interface'
import { CatalogModule } from './catalog.module'
import { ProductCardComponent } from './product-card/product-card.component'
import { CatalogFacade } from './state/catalog.facade'
import { ProductHelper } from './state/helpers/product.helper'

@Component({
  selector: 'ec-catalog',
  standalone: true,
  imports: [CommonModule, CatalogModule, ProductCardComponent],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent {
  private catalogFacade = inject(CatalogFacade)
  private productHelper = inject(ProductHelper)
  // public productsCardDetail$ = this.catalogFacade.products$.pipe(
  //   filter(products => Boolean(products)),
  //   map(products => this.productHelper.getProductsCardDetails(products) as ProductCardDetails[]),
  // )
  public productsCardDetail$ = this.catalogFacade.products$.pipe(
    map(products => {
      console.log(products)

      if (!products) {
        return []
      }

      const d = this.productHelper.getProductsCardDetails(products) as ProductCardDetails[]
      console.log(d)

      return d
    }),
  )
}
