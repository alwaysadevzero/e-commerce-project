import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core'
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { RouterModule } from '@angular/router'
import type { BaseAddress, MyCustomerDraft } from '@commercetools/platform-sdk'
import { TuiDay } from '@taiga-ui/cdk'
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiErrorModule,
  TuiHintModule,
  TuiHostedDropdownModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core'
import {
  TuiCheckboxLabeledModule,
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputDateModule,
  TuiInputModule,
  TuiInputPasswordModule,
  TuiSelectModule,
  TuiTextAreaModule,
} from '@taiga-ui/kit'
import type { Subscription } from 'rxjs'

import { dataValidator } from '../../shared/validators'
import { AuthHttpService } from '../services/auth.service'

@Component({
  selector: 'ec-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TuiInputModule,
    TuiInputPasswordModule,
    ReactiveFormsModule,
    TuiTextAreaModule,
    TuiHostedDropdownModule,
    TuiInputDateModule,
    TuiDataListModule,
    TuiSelectModule,
    TuiDataListWrapperModule,
    FormsModule,
    TuiCheckboxLabeledModule,
    TuiButtonModule,
    TuiFieldErrorPipeModule,
    TuiErrorModule,
    TuiHintModule,
    TuiTextfieldControllerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  test = TuiSelectModule
  title = 'Registration'
  address = 'Addresses'
  countries: string[] = ['United States (US)', 'Canada (CA)']

  public registrationForm = this.formBuilder.group({
    email: new FormControl<string | null>('', [
      dataValidator.noWhitespaceValidator,
      dataValidator.atValidator,
      dataValidator.domainValidator,
      dataValidator.formatValidator,
    ]),
    password: new FormControl<string | null>('', [
      dataValidator.noWhitespaceValidator,
      dataValidator.lowercaseValidator,
      dataValidator.uppercaseValidator,
      dataValidator.digitValidator,
      dataValidator.lengthValidator,
    ]),
    confirm: new FormControl<string | null>('', [dataValidator.confirmPasswordValidator]),
    firstName: new FormControl<string | null>('', [dataValidator.nameValidator, dataValidator.noWhitespaceValidator]),
    lastName: new FormControl<string | null>('', [dataValidator.nameValidator, dataValidator.noWhitespaceValidator]),
    dateOfBirth: new FormControl<TuiDay | null>(new TuiDay(2000, 0, 1), [dataValidator.dateOfBirthValidator]),
    street: new FormControl<string | null>('', [dataValidator.streetValidator, dataValidator.noWhitespaceValidator]),
    city: new FormControl<string | null>('', [dataValidator.nameValidator, dataValidator.noWhitespaceValidator]),
    country: new FormControl<string | null>('', [value => Validators.required(value)]),
    postalCode: new FormControl<string | null>('', [dataValidator.postalCodeValidator]),
    streetBilling: new FormControl<string | null>('', [
      dataValidator.streetValidator,
      dataValidator.noWhitespaceValidator,
    ]),
    cityBilling: new FormControl<string | null>('', [dataValidator.nameValidator, dataValidator.noWhitespaceValidator]),
    countryBilling: new FormControl<string | null>('', [value => Validators.required(value)]),
    postalCodeBilling: new FormControl<string | null>('', [dataValidator.postalCodeBillingValidator]),
    shipping: [false, Validators.requiredTrue.bind(Validators)],
    billing: [false, Validators.requiredTrue.bind(Validators)],
    shippingToBilling: [false, Validators.requiredTrue.bind(Validators)],
    shippingAndBilling: [false, Validators.requiredTrue.bind(Validators)],
  })

  constructor(private formBuilder: FormBuilder) {
    this.copyShippingToBilling()
    this.registerInputEventListeners()
    this.changePostalCodeAfterChangeCountry()
    this.setBothAddressesAsDefault()
  }

  private registerInputEventListeners(): void {
    Object.keys(this.registrationForm.controls).forEach(controlName => {
      const control = this.registrationForm.get(controlName)

      if (control) {
        const subscription = control.valueChanges.subscribe(() => {
          control.markAsTouched()
          subscription.unsubscribe()
        })
      }
    })
  }
  private changePostalCodeAfterChangeCountry(): void {
    this.registrationForm.get('country')?.valueChanges.subscribe(() => {
      this.registrationForm.get('postalCode')?.setValue(null)
    })
  }

  private setBothAddressesAsDefault(): void {
    const shippingAndBilling = this.registrationForm.get('shippingAndBilling')
    const shipping = this.registrationForm.get('shipping')
    const billing = this.registrationForm.get('billing')

    if (shippingAndBilling && shipping && billing) {
      shippingAndBilling.valueChanges.subscribe((value: boolean | null) => {
        const toggleValue = value ?? false
        shipping.setValue(toggleValue)
        shipping.disabled ? shipping.enable() : shipping.disable()
        billing.setValue(toggleValue)
        billing.disabled ? billing.enable() : billing.disable()
      })
    }
  }

  private copyShippingToBilling(): void {
    const shippingToBillingControl = this.registrationForm.get('shippingToBilling')
    const billingControl = this.registrationForm.get('billing')

    if (shippingToBillingControl && billingControl) {
      shippingToBillingControl.valueChanges.subscribe(value => {
        if (value) {
          this.copyValuesFromShippingToBilling()
          this.subscribeShippingToBilling()
        } else {
          this.clearBillingFields()
          this.unsubscribeShippingToBilling()
        }
      })
    }
  }

  private shippingToBillingSubscriptions: Subscription[] = []

  private subscribeShippingToBilling(): void {
    const fields: string[] = ['street', 'city', 'country', 'postalCode']

    fields.forEach((field: string) => {
      const shippingControl = this.registrationForm.get(field)
      const billingControl = this.registrationForm.get(`${field}Billing`)

      if (shippingControl && billingControl) {
        const subscription = shippingControl.valueChanges.subscribe((value: string | null) => {
          billingControl.setValue(value as never)
        })
        this.shippingToBillingSubscriptions.push(subscription)
      }
    })
  }

  private unsubscribeShippingToBilling(): void {
    this.shippingToBillingSubscriptions.forEach(subscription => {
      subscription.unsubscribe()
    })
    this.shippingToBillingSubscriptions = []
  }

  private copyValuesFromShippingToBilling(): void {
    const fields: string[] = ['street', 'city', 'country', 'postalCode']

    fields.forEach((field: string) => {
      const shippingControl = this.registrationForm.get(field)
      const billingControl = this.registrationForm.get(`${field}Billing`)

      if (shippingControl && billingControl) {
        billingControl.setValue(shippingControl.value as never)
      }
    })
  }

  private clearBillingFields(): void {
    const fields: string[] = ['streetBilling', 'cityBilling', 'countryBilling', 'postalCodeBilling']

    fields.forEach((field: string) => {
      const billingField = this.registrationForm.get(field)

      if (billingField) {
        billingField.setValue(null)
      }
    })
  }

  public submitForm(): void {
    const email = this.email.value ?? ''
    const password = this.password.value ?? ''
    const firstName = this.firstName.value ?? ''
    const lastName = this.lastName.value ?? ''
    const dateOfBirth = this.getDateOfBirth() ?? undefined
    const addresses = this.getAddresses() ?? []
    const defaultShippingAddress = this.getDefaultAddresses()[0] ?? undefined
    const defaultBillingAddress = this.getDefaultAddresses()[1] ?? undefined

    const customer: MyCustomerDraft = {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      addresses,
      defaultShippingAddress,
      defaultBillingAddress,
    }
    this.authHttpService.signup(customer)
  }

  private getShippingAddress(): BaseAddress | undefined {
    const { street, city, postalCode } = this.registrationForm.getRawValue()

    let country = this.registrationForm.controls.country.getRawValue()

    if (country) {
      const startIndex = country.indexOf('(') + 1
      const endIndex = country.indexOf(')')
      country = country.slice(startIndex, endIndex)
    }

    if (street && city && country && postalCode) {
      return { key: 'keyShippingAddress', country, city, streetName: street, postalCode }
    }

    return undefined
  }

  private getBillingAddress(): BaseAddress | undefined {
    const { streetBilling, cityBilling, postalCodeBilling } = this.registrationForm.getRawValue()

    let countryBilling = this.registrationForm.controls.countryBilling.getRawValue()

    if (countryBilling) {
      const startIndex = countryBilling.indexOf('(') + 1
      const endIndex = countryBilling.indexOf(')')
      countryBilling = countryBilling.slice(startIndex, endIndex)
    }

    if (streetBilling && cityBilling && countryBilling && postalCodeBilling) {
      return {
        key: 'keyBillingAddress',
        country: countryBilling,
        city: cityBilling,
        streetName: streetBilling,
        postalCode: postalCodeBilling,
      }
    }

    return undefined
  }

  private getAddresses(): BaseAddress[] {
    const addresses: BaseAddress[] = []
    const shippingAddress = this.getShippingAddress()
    const billingAddress = this.getBillingAddress()

    if (shippingAddress) {
      addresses.push(shippingAddress as never)
    }

    if (billingAddress) {
      addresses.push(billingAddress as never)
    }

    return addresses
  }

  private getDateOfBirth(): string | undefined {
    const day = this.registrationForm.get('dateOfBirth')?.value

    if (day) {
      const dateOfBirth = `${day.year}-${String(day.month + 1).padStart(2, '0')}-${String(day.day).padStart(2, '0')}`

      return dateOfBirth
    }

    return undefined
  }

  private getDefaultAddresses(): Array<number | null> {
    let defaultShippingAddress: number | null = null
    let defaultBillingAddress: number | null = null

    if (this.registrationForm.get('shipping')?.value) {
      defaultShippingAddress = 0
    }

    if (this.registrationForm.get('billing')?.value) {
      defaultBillingAddress = 1
    }

    return [defaultShippingAddress, defaultBillingAddress]
  }

  get email(): FormControl<string | null> {
    return this.registrationForm.controls.email
  }

  get password(): FormControl<string | null> {
    return this.registrationForm.controls.password
  }

  get confirm(): FormControl<string | null> {
    return this.registrationForm.controls.confirm
  }

  get firstName(): FormControl<string | null> {
    return this.registrationForm.controls.firstName
  }

  get lastName(): FormControl<string | null> {
    return this.registrationForm.controls.lastName
  }

  get dateOfBirth(): FormControl<TuiDay | null> {
    return this.registrationForm.controls.dateOfBirth
  }

  get street(): FormControl<string | null> {
    return this.registrationForm.controls.street
  }

  get city(): FormControl<string | null> {
    return this.registrationForm.controls.city
  }

  get postalCode(): FormControl<string | null> {
    return this.registrationForm.controls.postalCode
  }

  get streetBilling(): FormControl<string | null> {
    return this.registrationForm.controls.streetBilling
  }

  get cityBilling(): FormControl<string | null> {
    return this.registrationForm.controls.cityBilling
  }

  get postalCodeBilling(): FormControl<string | null> {
    return this.registrationForm.controls.postalCodeBilling
  }
}
