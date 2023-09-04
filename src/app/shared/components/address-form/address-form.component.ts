import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, type OnChanges, Output, type SimpleChanges } from '@angular/core'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import type { Address, BaseAddress } from '@commercetools/platform-sdk'
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiErrorModule,
  TuiNotificationModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core'
import {
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiMarkerIconModule,
  TuiSelectModule,
} from '@taiga-ui/kit'

import { Country } from '../../enums/countryCode.enum'
import { dataValidator } from '../../validators'

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TuiErrorModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiFieldErrorPipeModule,
    TuiNotificationModule,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiMarkerIconModule,
    TuiSvgModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    AddressFormComponent,
  ],
  selector: 'ec-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  standalone: true,
})
export class AddressFormComponent implements OnChanges {
  @Input() address: Address | null = null
  @Input() editMode = false

  @Output() formSubmit = new EventEmitter<Address>()

  public countries: string[] = Object.values(Country)
  // public addressForm!: FormGroup

  public addressForm = new FormGroup({
    streetName: new FormControl<string>('', [dataValidator.streetValidator, dataValidator.noWhitespaceValidator]),
    city: new FormControl<string>('', [dataValidator.nameValidator, dataValidator.noWhitespaceValidator]),
    country: new FormControl<string>('', [value => Validators.required(value)]),
    postalCode: new FormControl<string>('', [dataValidator.postalCodeValidator]),
  })

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['address'] && this.address) {
      this.initializeForm()
    }

    if (changes['editMode']) {
      this.editMode ? this.addressForm.enable() : this.addressForm.disable()
    }
  }

  private initializeForm(): void {
    this.addressForm = new FormGroup({
      streetName: new FormControl<string>(this.address?.streetName || '', [
        dataValidator.streetValidator,
        dataValidator.noWhitespaceValidator,
      ]),
      city: new FormControl<string>(this.address?.city || '', [
        dataValidator.nameValidator,
        dataValidator.noWhitespaceValidator,
      ]),
      country: new FormControl<string>(
        this.address?.country ? Country[this.address.country as keyof typeof Country] : '',
        [value => Validators.required(value)],
      ),
      postalCode: new FormControl<string>(this.address?.postalCode || '', [dataValidator.postalCodeValidator]),
    })
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      const address = this.addressForm.getRawValue() as BaseAddress

      const countryKey = Object.keys(Country).find(key => Country[key as keyof typeof Country] === address.country)

      if (countryKey) {
        const updatedAddress: BaseAddress = {
          ...address,
          country: countryKey,
        }
        this.formSubmit.emit(updatedAddress)
      }
    }
  }
}
