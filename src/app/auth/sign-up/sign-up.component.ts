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
  TuiNotificationModule,
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
import { AuthFacade } from '../state/auth.facade'

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
    TuiNotificationModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  countries: string[] = ['United States (US)', 'Canada (CA)']
  private formBuilder: FormBuilder = inject(FormBuilder)
  private authHttpService: AuthHttpService = inject(AuthHttpService)
  private authFacade: AuthFacade = inject(AuthFacade)

  public error = this.authFacade.errorMessage$

  private shippingToBillingSubscriptions: Subscription[] = []
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
    street: new FormControl<string | null>('', [dataValidator.streetValidator]),
    city: new FormControl<string | null>('', [dataValidator.nameValidator, dataValidator.noWhitespaceValidator]),
    country: new FormControl<string | null>('', [value => Validators.required(value)]),
    postalCode: new FormControl<string | null>('', [dataValidator.postalCodeValidator]),
    streetBilling: new FormControl<string | null>('', []),
    cityBilling: new FormControl<string | null>('', []),
    countryBilling: new FormControl<string | null>('', []),
    postalCodeBilling: new FormControl<string | null>('', []),
    shipping: [false],
    billing: [{ value: false, disabled: true }],
    useBilling: [false],
    useShipping: [{ value: true, disabled: true }],
    shippingToBilling: [false],
    shippingAndBilling: [false],
  })

  constructor() {
    this.copyShippingToBilling()
    this.registerInputEventListeners()
    this.changePostalCodeAfterChangeCountry()
    this.setBillingValidate()
    this.addDisabledFields()
    this.toggleDisabledFields()
    this.setBothAddressesAsDefault()
    this.toggleDisabledDefaults()
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
    const useBilling = this.registrationForm.get('useBilling')
    const shipping = this.registrationForm.get('shipping')
    const billing = this.registrationForm.get('billing')

    if (shippingAndBilling && shipping && billing) {
      shippingAndBilling.valueChanges.subscribe((value: boolean | null) => {
        const toggleValue = value ?? false
        useBilling?.setValue(toggleValue)
        shipping.setValue(toggleValue)
        billing.setValue(toggleValue)
      })
    }
  }

  private copyShippingToBilling(): void {
    const shippingToBillingControl = this.registrationForm.get('shippingToBilling')
    const billingControl = this.registrationForm.get('useBilling')

    if (shippingToBillingControl) {
      shippingToBillingControl.valueChanges.subscribe(value => {
        if (value) {
          billingControl?.setValue(true)
          this.copyValuesFromShippingToBilling()
          this.subscribeShippingToBilling()
          this.toggleDisabledFields()
          this.setBillingValidate()
        } else {
          billingControl?.setValue(false)
          this.unsubscribeShippingToBilling()
          this.setBillingValidate()
        }
      })
    }
  }
  private setBillingValidate(): void {
    const billingControl = this.registrationForm.get('useBilling')

    if (billingControl) {
      billingControl.valueChanges.subscribe(value => {
        if (value) {
          this.addBillingValidators()
        } else {
          this.addClearValidators()
        }
      })
    }
  }

  private addBillingValidators(): void {
    const { streetBilling, cityBilling, countryBilling, postalCodeBilling } = this.registrationForm.controls

    if (streetBilling && cityBilling && countryBilling && postalCodeBilling) {
      streetBilling?.addValidators([dataValidator.streetValidator])
      cityBilling?.addValidators([dataValidator.nameValidator])
      countryBilling?.addValidators([value => Validators.required(value)])
      postalCodeBilling?.addValidators([dataValidator.postalCodeBillingValidator])
    }
  }

  private toggleDisabledFields(): void {
    const billingControl = this.registrationForm.get('useBilling')

    if (billingControl) {
      billingControl.valueChanges.subscribe(value => {
        if (value) {
          this.addEnabledFields()
        } else {
          this.addDisabledFields()
        }
      })
    }
  }

  private toggleDisabledDefaults(): void {
    const useBilling = this.registrationForm.get('useBilling')
    const billing = this.registrationForm.get('billing')

    if (billing && useBilling) {
      useBilling.valueChanges.subscribe(value => {
        if (value) {
          billing.enable()
        } else {
          billing.disable()
          billing.setValue(false)
        }
      })
    }
  }

  private addClearValidators(): void {
    const { streetBilling, cityBilling, countryBilling, postalCodeBilling } = this.registrationForm.controls

    const controls = [streetBilling, cityBilling, countryBilling, postalCodeBilling]
    controls.forEach(control => {
      if (control) {
        control.clearValidators()
      }
    })
  }

  private addDisabledFields(): void {
    const { streetBilling, cityBilling, countryBilling, postalCodeBilling } = this.registrationForm.controls

    const controls = [streetBilling, cityBilling, countryBilling, postalCodeBilling]
    controls.forEach(control => {
      if (control) {
        control.disable()
      }
    })
  }

  private addEnabledFields(): void {
    const { streetBilling, cityBilling, countryBilling, postalCodeBilling } = this.registrationForm.controls

    const controls = [streetBilling, cityBilling, countryBilling, postalCodeBilling]
    controls.forEach(control => {
      if (control) {
        control.enable()
      }
    })
  }

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

  public submitForm(): void {
    const email = this.email.value ?? ''
    const password = this.password.value ?? ''
    const firstName = this.firstName.value ?? ''
    const lastName = this.lastName.value ?? ''
    const dateOfBirth = this.getDateOfBirth() ?? undefined
    const addresses = this.getAddresses() ?? []
    const defaultShippingAddress = this.getDefaultAddresses()[0] ?? undefined
    const defaultBillingAddress = this.getDefaultAddresses()[1] ?? undefined

    const customerDraft: MyCustomerDraft = {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      addresses,
      defaultShippingAddress,
      defaultBillingAddress,
    }
    this.authFacade.signupUser(customerDraft)

    const formValueChangesSubscription = this.registrationForm.valueChanges.subscribe(() => {
      this.authFacade.clearErrorMessage()
      formValueChangesSubscription.unsubscribe()
    })
  }

  public getShippingAddress(): BaseAddress | undefined {
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
