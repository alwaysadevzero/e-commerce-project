import { CommonModule } from '@angular/common'
import { Component, inject, Input, type OnInit } from '@angular/core'
import { Product } from '@commercetools/platform-sdk'
import { TuiIslandModule } from '@taiga-ui/kit'

import { ProductCardDetails } from '../../shared/models/product-details.interface'
import { ProductHelper } from '../state/helpers/product.helper'

@Component({
  selector: 'ec-product-card',
  standalone: true,
  imports: [CommonModule, TuiIslandModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() productCardDetail!: ProductCardDetails
  private productHelper = inject(ProductHelper)

  ngOnInit(): void {
    console.log(this.productCardDetail)
  }
}
