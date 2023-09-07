import { CommonModule } from '@angular/common'
import { Component, EventEmitter, inject, Input, Output } from '@angular/core'
import { type FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import type { Address } from '@commercetools/platform-sdk'
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
  TuiIslandModule,
  TuiMarkerIconModule,
  TuiSelectModule,
} from '@taiga-ui/kit'

import { CustomerFacade } from '../../core/store/customer/customer.facade'
import { AddressFormComponent } from '../../shared/components/address-form/address-form.component'
import type { CustomerAddress } from '../../shared/models/customer-data.interface'

@Component({
  selector: 'ec-address-profile',
  standalone: true,
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
    TuiIslandModule,
    TuiMarkerIconModule,
    TuiSvgModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    AddressFormComponent,
  ],
  templateUrl: './address-profile.component.html',
  styleUrls: ['./address-profile.component.scss'],
})
export class AddressProfileComponent {
  @Input() address: Address | null = null
  private customerFacade = inject(CustomerFacade)
  public defaultShippingAddress$ = this.customerFacade.defaultShippingAddress$
  public defaultBillingAddress$ = this.customerFacade.defaultBillingAddress$
  public editMode = false
  public countries: string[] = ['United States (US)', 'Canada (CA)']
  public addressForm!: FormGroup

  setDefaultBillingAddress(): void {
    if (this.address?.id) {
      this.customerFacade.setDefaultBillingAddress(this.address.id)
    }
  }

  setDefaultShippingAddress(): void {
    if (this.address?.id) {
      this.customerFacade.setDefaultShippingAddress(this.address.id)
    }
  }

  onAddressFormSubmit(address: Address): void {
    const { streetName, city, postalCode, country } = address as CustomerAddress

    if (streetName && city && postalCode && country && this.address?.id) {
      this.customerFacade.changeAddress({
        addressId: this.address.id,
        streetName,
        city,
        postalCode,
        country,
      })
    }
  }

  public toggleEditMode(): void {
    this.editMode = !this.editMode
  }

  public removeAddress(): void {
    if (!this.address?.id) {
      return
    }

    this.customerFacade.removeAddress(this.address.id)
  }
}
