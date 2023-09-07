import { inject, Injectable } from '@angular/core'
import type { Product } from '@commercetools/platform-sdk'
import { map, type Observable } from 'rxjs'
import { fromPromise } from 'rxjs/internal/observable/innerFrom'

import { ApiClientBuilderService } from '../../core/services/api-client-builder.service'

@Injectable({
  providedIn: 'root',
})
export class ProductHttpService {
  private api = inject(ApiClientBuilderService)

  public getProducts(): Observable<Product[]> {
    return fromPromise(this.api.getApi.products().get().execute()).pipe(map(({ body }) => body.results))
  }
}
