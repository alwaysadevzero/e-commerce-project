/* eslint-disable @typescript-eslint/naming-convention */
import type { BaseAddress, Customer, MyCustomerDraft } from '@commercetools/platform-sdk'
import { createActionGroup, emptyProps } from '@ngrx/store'

import type {
  CustomerAddress,
  CustomerCredential,
  CustomerDetails,
  PasswordCredential,
} from '../../../shared/models/customer-data.interface'
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
    [CustomerActions.updateDetails]: (customerDetails: CustomerDetails) => ({ customerDetails }),
    [CustomerActions.updateDetailsSuccess]: (customer: Customer) => ({ customer }),
    [CustomerActions.updateDetailsFailure]: (errorMessage: string) => ({ errorMessage }),
    [CustomerActions.addAddress]: (address: BaseAddress) => ({ address }),
    [CustomerActions.addAddressSuccess]: (customer: Customer) => ({ customer }),
    [CustomerActions.addAddressFailure]: (errorMessage: string) => ({ errorMessage }),
    [CustomerActions.removeAddress]: (addressId: string) => ({ addressId }),
    [CustomerActions.removeAddressSuccess]: (customer: Customer) => ({ customer }),
    [CustomerActions.removeAddressFailure]: (errorMessage: string) => ({ errorMessage }),
    [CustomerActions.changeAddress]: (customerAddress: CustomerAddress) => ({ customerAddress }),
    [CustomerActions.changeAddressSuccess]: (customer: Customer) => ({ customer }),
    [CustomerActions.changeAddressFailure]: (errorMessage: string) => ({ errorMessage }),
  },
})
