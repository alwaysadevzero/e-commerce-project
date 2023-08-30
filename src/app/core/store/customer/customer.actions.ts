/* eslint-disable @typescript-eslint/naming-convention */
import type { Customer } from '@commercetools/platform-sdk'
import { createActionGroup, emptyProps } from '@ngrx/store'

export const customerActions = createActionGroup({
  source: 'Customer',
  events: {
    'Init Customer State': emptyProps(),
    'Reset Customer State': emptyProps(),
    'Load Customer': emptyProps(),
    'Load Customer Success': (customer: Customer) => ({ customer }),
    'Set Customer ': (customer: Customer) => ({ customer }),
    'Load Customer Failure': (errorMessage: string) => ({ errorMessage }),
    'Clear Error Message': emptyProps(),
    'Set Error Message': (errorMessage: string) => ({ errorMessage }),
  },
})
