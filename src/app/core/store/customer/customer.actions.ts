/* eslint-disable @typescript-eslint/naming-convention */
import type { Customer, MyCustomerDraft } from '@commercetools/platform-sdk'
import { createActionGroup, emptyProps } from '@ngrx/store'

import type { CustomerCredential, PasswordCredential } from '../../../shared/models/customer-data.interface'
import { CustomerActions } from '../../enums/customer-actions.enum'

export const customerActions = createActionGroup({
  source: 'Customer',
  events: {
    [CustomerActions.initCustomerState]: emptyProps(),
    [CustomerActions.resetCustomerState]: emptyProps(),
    [CustomerActions.setCustomer]: (customer: Customer) => ({ customer }),
    [CustomerActions.clearErrorMessage]: emptyProps(),
    [CustomerActions.loginCustomer]: (customerCredential: CustomerCredential) => ({ customerCredential }),
    [CustomerActions.loginCustomerSucces]: (customer: Customer) => ({ customer }),
    [CustomerActions.loginCustomerFailure]: (errorMessage: string) => ({ errorMessage }),
    [CustomerActions.reloginCustomer]: (customerCredential: CustomerCredential) => ({ customerCredential }),
    [CustomerActions.reloginCustomerFailure]: (errorMessage: string) => ({ errorMessage }),
    [CustomerActions.reloginCustomerSuccsess]: (customer: Customer) => ({ customer }),
    [CustomerActions.refreshCustomer]: emptyProps(),
    [CustomerActions.refreshCustomerFailure]: (errorMessage: string) => ({ errorMessage }),
    [CustomerActions.refreshCustomerSuccsess]: (customer: Customer) => ({ customer }),
    [CustomerActions.registerCustomer]: (customerDraft: MyCustomerDraft) => ({ customerDraft }),
    [CustomerActions.registerCustomerFailure]: (errorMessage: string) => ({ errorMessage }),
    [CustomerActions.registerCustomerSuccsess]: (customer: Customer) => ({ customer }),
    [CustomerActions.logoutCustomer]: emptyProps(),
    [CustomerActions.loadAnonymousCustomer]: emptyProps(),
    [CustomerActions.loadAnonymousCustomerFailure]: (errorMessage: string) => ({ errorMessage }),
    [CustomerActions.loadAnonymousCustomerSuccsess]: emptyProps(),
    [CustomerActions.changePassword]: (passwordCredential: PasswordCredential) => ({ passwordCredential }),
    [CustomerActions.changePasswordFailure]: (errorMessage: string) => ({ errorMessage }),
    [CustomerActions.changePasswordSuccsess]: (customerCredential: CustomerCredential) => ({ customerCredential }),
  },
})
