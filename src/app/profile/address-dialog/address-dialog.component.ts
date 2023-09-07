import { Component, Inject, inject } from '@angular/core'
import type { Address } from '@commercetools/platform-sdk'
import { TuiAlertService, TuiDialogContext, TuiNotificationModule } from '@taiga-ui/core'
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus'
import { filter, first } from 'rxjs'

import { CustomerFacade } from '../../core/store/customer/customer.facade'
import { AddressFormComponent } from '../../shared/components/address-form/address-form.component'

@Component({
  standalone: true,
  imports: [TuiNotificationModule, AddressFormComponent],
  selector: 'ec-address-dialog',
  templateUrl: './address-dialog.component.html',
  styleUrls: ['./address-dialog.component.scss'],
})
export class AddressDialogComponent {
  private address: Address | null = null
  private customerFacade = inject(CustomerFacade)
  private alertService = inject(TuiAlertService)
  public error = this.customerFacade.errorMessage$

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<boolean>,
  ) {}

  onAddressFormSubmit(address: Address): void {
    const { streetName, city, postalCode, country } = address

    if (streetName && city && postalCode && country) {
      this.customerFacade.addAddress({
        streetName,
        city,
        postalCode,
        country,
      })
      this.customerFacade.customerSucceedAddAddress$
        .pipe(
          filter(added => added),
          first(),
        )
        .subscribe(() => {
          this.alertService.open('address added', { status: 'success' }).subscribe()
          this.context.completeWith(true)
        })
    }
  }

  cancel(): void {
    this.context.completeWith(false)
  }
}
