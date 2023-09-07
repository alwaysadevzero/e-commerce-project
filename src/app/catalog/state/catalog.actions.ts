/* eslint-disable @typescript-eslint/naming-convention */
import type { Product } from '@commercetools/platform-sdk'
import { createActionGroup, emptyProps } from '@ngrx/store'

import { CatalogActions } from '../enums/catalog.actions.enum'

export const catalogActions = createActionGroup({
  source: 'Catalog',
  events: {
    [CatalogActions.initCatalogState]: emptyProps(),
    [CatalogActions.initCatalogStateSuccess]: (products: Product[]) => ({ products }),
    [CatalogActions.initCatalogStateFailure]: (errorMessage: string) => ({ errorMessage }),
  },
})
