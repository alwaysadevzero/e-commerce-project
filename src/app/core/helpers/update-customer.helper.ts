import type {
  Address,
  BaseAddress,
  MyCustomerAddAddressAction,
  MyCustomerChangeAddressAction,
  MyCustomerChangeEmailAction,
  MyCustomerRemoveAddressAction,
  MyCustomerSetDateOfBirthAction,
  MyCustomerSetDefaultBillingAddressAction,
  MyCustomerSetDefaultShippingAddressAction,
  MyCustomerSetFirstNameAction,
  MyCustomerSetLastNameAction,
  MyCustomerUpdateAction,
} from '@commercetools/platform-sdk'

import type { CustomerAddress, CustomerDetails } from '../../shared/models/customer-data.interface'

export class Detail {
  private actions: MyCustomerUpdateAction[] = []

  public getActions(): MyCustomerUpdateAction[] {
    const actionArr = this.actions
    this.actions = []

    return actionArr
  }

  public getCustomerDetailActions(customerDetail: CustomerDetails): MyCustomerUpdateAction[] {
    const { firstName, lastName, email, dateOfBirth } = customerDetail
    this.email(email)
    this.firstName(firstName)
    this.lastName(lastName)
    this.dateOfBirth(dateOfBirth)

    return this.getActions()
  }

  public getCustomerChangeAddressActions(customerAddress: CustomerAddress): MyCustomerUpdateAction[] {
    const address: Address = customerAddress
    this.changeAddress(customerAddress.addressId, address)

    return this.getActions()
  }

  public getCustomerRemoveAddressActions(addressId: string): MyCustomerUpdateAction[] {
    this.removeAddress(addressId)

    return this.getActions()
  }

  public getCustomerAddAddressActions(address: Address): MyCustomerUpdateAction[] {
    this.addAddress(address)

    return this.getActions()
  }

  public getCustomerDefaultShippingAddressActions(addressId: string): MyCustomerUpdateAction[] {
    this.defaultShippingAddress(addressId)

    return this.getActions()
  }

  public getCustomerDefaultBillingAddressActions(addressId: string): MyCustomerUpdateAction[] {
    this.defaultBillingAddress(addressId)

    return this.getActions()
  }

  private email(email: string): void {
    const action: MyCustomerChangeEmailAction = {
      action: 'changeEmail',
      email,
    }
    this.actions.push(action)
  }
  private firstName(firstName: string): void {
    const action: MyCustomerSetFirstNameAction = {
      action: 'setFirstName',
      firstName,
    }
    this.actions.push(action)
  }

  private lastName(lastName: string): void {
    const action: MyCustomerSetLastNameAction = {
      action: 'setLastName',
      lastName,
    }
    this.actions.push(action)
  }

  private dateOfBirth(dateOfBirth: string): void {
    const action: MyCustomerSetDateOfBirthAction = {
      action: 'setDateOfBirth',
      dateOfBirth,
    }
    this.actions.push(action)
  }

  private addAddress(address: BaseAddress): void {
    const action: MyCustomerAddAddressAction = {
      action: 'addAddress',
      address,
    }
    this.actions.push(action)
  }

  private changeAddress(addressId: string, address: Address): void {
    const action: MyCustomerChangeAddressAction = {
      action: 'changeAddress',
      addressId,
      address,
    }
    this.actions.push(action)
  }
  private removeAddress(addressId: string): void {
    const action: MyCustomerRemoveAddressAction = {
      action: 'removeAddress',
      addressId,
    }
    this.actions.push(action)
  }

  private defaultShippingAddress(addressId: string): void {
    const action: MyCustomerSetDefaultShippingAddressAction = {
      action: 'setDefaultShippingAddress',
      addressId,
    }
    this.actions.push(action)
  }

  private defaultBillingAddress(addressId: string): void {
    const action: MyCustomerSetDefaultBillingAddressAction = {
      action: 'setDefaultBillingAddress',
      addressId,
    }
    this.actions.push(action)
  }
}
