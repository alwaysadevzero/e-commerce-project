import { inject, Injectable } from '@angular/core'
import type { Address, Customer, MyCustomerChangePassword, MyCustomerUpdate } from '@commercetools/platform-sdk'
import { map, type Observable } from 'rxjs'
import { fromPromise } from 'rxjs/internal/observable/innerFrom'

import type { CustomerAddress, CustomerDetails } from '../../../../shared/models/customer-data.interface'
import { Detail } from '../../../helpers/update-customer.helper'
import { ApiClientBuilderService } from '../../../services/api-client-builder.service'

@Injectable({
  providedIn: 'root',
})
export class ProfileHttpService {
  private apiClientBuilderService = inject(ApiClientBuilderService)
  private details = new Detail()

  public changePassword(myCustomerChangePassword: MyCustomerChangePassword): Observable<Customer> {
    return fromPromise(
      this.apiClientBuilderService.getApi
        .me()
        .password()
        .post({
          body: myCustomerChangePassword,
        })
        .execute(),
    ).pipe(map(({ body }) => body))
  }

  public updateDetails(version: number, customerDetails: CustomerDetails): Observable<Customer> {
    const actions = this.details.getCustomerDetailActions(customerDetails)
    const customerUpdate: MyCustomerUpdate = {
      version,
      actions,
    }

    return this.updateCustomer(customerUpdate)
  }

  public changeAddress(version: number, customerAddress: CustomerAddress): Observable<Customer> {
    const actions = this.details.getCustomerChangeAddressActions(customerAddress)
    const customerUpdate: MyCustomerUpdate = {
      version,
      actions,
    }

    return this.updateCustomer(customerUpdate)
  }

  public removeAddress(version: number, addressId: string): Observable<Customer> {
    const actions = this.details.getCustomerRemoveAddressActions(addressId)
    const customerUpdate: MyCustomerUpdate = {
      version,
      actions,
    }

    return this.updateCustomer(customerUpdate)
  }

  public setDefaultShippingAddres(version: number, addressId: string): Observable<Customer> {
    const actions = this.details.getCustomerRemoveAddressActions(addressId)
    const customerUpdate: MyCustomerUpdate = {
      version,
      actions,
    }

    return this.updateCustomer(customerUpdate)
  }

  public addAddress(version: number, address: Address): Observable<Customer> {
    const actions = this.details.getCustomerAddAddressActions(address)
    const customerUpdate: MyCustomerUpdate = {
      version,
      actions,
    }

    return this.updateCustomer(customerUpdate)
  }

  public setDefaultShippingAddress(version: number, addressId: string): Observable<Customer> {
    const actions = this.details.getCustomerDefaultShippingAddressActions(addressId)
    const customerUpdate: MyCustomerUpdate = {
      version,
      actions,
    }

    return this.updateCustomer(customerUpdate)
  }

  public setDefaultBillingAddress(version: number, addressId: string): Observable<Customer> {
    const actions = this.details.getCustomerDefaultBillingAddressActions(addressId)
    const customerUpdate: MyCustomerUpdate = {
      version,
      actions,
    }

    return this.updateCustomer(customerUpdate)
  }

  private updateCustomer(customerUpdate: MyCustomerUpdate): Observable<Customer> {
    return fromPromise(this.apiClientBuilderService.getApi.me().post({ body: customerUpdate }).execute()).pipe(
      map(({ body }) => body),
    )
  }
}
