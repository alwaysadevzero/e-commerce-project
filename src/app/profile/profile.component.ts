import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
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
  TuiMarkerIconModule,
  TuiSelectModule,
  TuiTextAreaModule,
} from '@taiga-ui/kit'

import { CustomerProfileEditorComponent } from './customer-profile-editor/customer-profile-editor.component'
import { ProfileFacade } from './state/profile.facade'

@Component({
  selector: 'ec-profile',
  standalone: true,
  imports: [
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
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  private profileFacade = inject(ProfileFacade)
  public changePassword(): void {
    this.profileFacade.customerChangePassword({ currentPassword: 'aaaaaa1A', newPassword: 'aaaaaa1A' })
  }

  public onClose(): boolean {
    return true
  }
}
