import type { Customer } from '@commercetools/platform-sdk'
import { createActionGroup } from '@ngrx/store'

import type { PasswordCredential } from '../../shared/models/customer-data.interface'

export const profileActions = createActionGroup({
  source: 'Profile Component',
  events: {
    /* eslint-disable @typescript-eslint/naming-convention */
    'Change Password': (passwordCredential: PasswordCredential) => ({ passwordCredential }),
    'Change Password Success': (customer: Customer) => ({ customer }),
    'Change Password Failure': (errorMessage: string) => ({ errorMessage }),
  },
})
