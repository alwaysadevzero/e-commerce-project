import type { Customer, MyCustomerDraft } from '@commercetools/platform-sdk'
import { createActionGroup, emptyProps } from '@ngrx/store'

import type { CustomerCredential } from '../../shared/models/user-data.inteface'

export const authActions = createActionGroup({
  source: 'Customer',
  events: {
    /* eslint-disable @typescript-eslint/naming-convention */
    'Login Customer': (customerCredential: CustomerCredential) => ({ customerCredential }),
    'Register Customer': (customerDraft: MyCustomerDraft) => ({ customerDraft }),
    'Logout Customer': emptyProps(),
    'Init Customer State': emptyProps(),
    'Refresh Customer': emptyProps(),
    'Refresh Customer Success': (customer: Customer) => ({ customer }),
    'Refresh Customer Failure': emptyProps(),
    'Load Anonymous Customer': emptyProps(),
    'Load Anonymous Customer Success': emptyProps(),
    'Load Anonymous Customer Failure': ({ errorMessage }: { errorMessage: string }) => ({ errorMessage }),
    'Load Customer Success': (customer: Customer) => ({ customer }),
    'Load Customer Failure': (errorMessage: string) => ({ errorMessage }),
    'Clear Error Message': emptyProps(),
  },
})
