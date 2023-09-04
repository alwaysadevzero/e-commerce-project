import type {
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

export class CustomerUpdate {
  private actions!: MyCustomerUpdateAction[]

  public getActions(): MyCustomerUpdateAction[] {
    return this.actions
  }

  public clearActions(): void {
    this.actions = []
  }

  public email(email: string): void {
    const action: MyCustomerChangeEmailAction = {
      action: 'changeEmail',
      email,
    }
    this.actions.push(action)
  }
  public firstName(firstName: string): void {
    const action: MyCustomerSetFirstNameAction = {
      action: 'setFirstName',
      firstName,
    }
    this.actions.push(action)
  }

  public lastName(lastName: string): void {
    const action: MyCustomerSetLastNameAction = {
      action: 'setLastName',
      lastName,
    }
    this.actions.push(action)
  }

  public dateOfBirth(dateOfBirth: string): void {
    const action: MyCustomerSetDateOfBirthAction = {
      action: 'setDateOfBirth',
      dateOfBirth,
    }
    this.actions.push(action)
  }

  public addAddress(address: BaseAddress): void {
    const action: MyCustomerAddAddressAction = {
      action: 'addAddress',
      address,
    }
    this.actions.push(action)
  }

  public changeAddress(address: BaseAddress, addressId: string): void {
    const action: MyCustomerChangeAddressAction = {
      action: 'changeAddress',
      addressId,
      address,
    }
    this.actions.push(action)
  }
  public removeAddress(addressId: string): void {
    const action: MyCustomerRemoveAddressAction = {
      action: 'removeAddress',
      addressId,
    }
    this.actions.push(action)
  }

  public defaultShippingAddress(addressId: string): void {
    const action: MyCustomerSetDefaultShippingAddressAction = {
      action: 'setDefaultShippingAddress',
      addressId,
    }
    this.actions.push(action)
  }

  public defaultBillingAddress(addressId: string): void {
    const action: MyCustomerSetDefaultBillingAddressAction = {
      action: 'setDefaultBillingAddress',
      addressId,
    }
    this.actions.push(action)
  }
}
