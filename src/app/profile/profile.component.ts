import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, Injector, OnInit } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Address } from '@commercetools/platform-sdk'
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogModule,
  TuiDialogService,
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
  TuiIslandModule,
  TuiMarkerIconModule,
  TuiSelectModule,
  TuiTextAreaModule,
} from '@taiga-ui/kit'
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus'

import { CustomerFacade } from '../core/store/customer/customer.facade'
import { AddressFormComponent } from '../shared/components/address-form/address-form.component'
import { AddressDialogComponent } from './address-dialog/address-dialog.component'
import { AddressProfileComponent } from './address-profile/address-profile.component'
import { CustomerProfileEditorComponent } from './customer-profile-editor/customer-profile-editor.component'
import { PasswordChangeDialogComponent } from './password-change-dialog/password-change-dialog.component'

@Component({
  selector: 'ec-profile',
  standalone: true,
  imports: [
    TuiIslandModule,
    CommonModule,
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
    TuiMarkerIconModule,
    CustomerProfileEditorComponent,
    TuiDialogModule,
    AddressProfileComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  private customerFacade = inject(CustomerFacade)
  public addresses$ = this.customerFacade.addresses$
  private injector = inject(Injector)
  private dialogs = inject(TuiDialogService)

  public openAddressDialog(): void {
    this.dialogs.open(new PolymorpheusComponent(AddressDialogComponent)).subscribe()
  }
}
