import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, Injector } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
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
  TuiMarkerIconModule,
  TuiSelectModule,
  TuiTextAreaModule,
} from '@taiga-ui/kit'
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus'

import { CustomerProfileEditorComponent } from './customer-profile-editor/customer-profile-editor.component'
import { PasswordChangeDialogComponent } from './password-change-dialog/password-change-dialog.component'

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
    TuiDialogModule,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  public onClose(): boolean {
    return true
  }
}
