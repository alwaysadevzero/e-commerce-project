import type { Customer, MyCustomerDraft } from '@commercetools/platform-sdk'
import { createActionGroup, emptyProps } from '@ngrx/store'

import type { CustomerCredential } from '../../shared/models/customer-data.interface'

export const authActions = createActionGroup({
  source: 'Customer',
  events: {
    /* eslint-disable @typescript-eslint/naming-convention */
    'Login Customer': (customerCredential: CustomerCredential) => ({ customerCredential }),
    'Relogin Customer': (customerCredential: CustomerCredential) => ({ customerCredential }),
    'Update Customer': emptyProps(),
    'Register Customer': (customerDraft: MyCustomerDraft) => ({ customerDraft }),
    'Logout Customer': emptyProps(),
    'Init Customer State': emptyProps(),
    'Refresh Customer': emptyProps(),
    'Load Anonymous Customer': emptyProps(),
  },
})
