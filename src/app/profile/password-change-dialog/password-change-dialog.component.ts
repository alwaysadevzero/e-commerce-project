import { CommonModule } from '@angular/common'
import { Component, Inject, inject } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import {
  TuiAlertService,
  TuiButtonModule,
  TuiDialogContext,
  TuiErrorModule,
  TuiNotificationModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core'
import { TuiFieldErrorPipeModule, TuiInputPasswordModule } from '@taiga-ui/kit'
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus'
import { filter, first, map, mergeMap, take, tap } from 'rxjs'

import { CustomerFacade } from '../../core/store/customer/customer.facade'
import { dataValidator } from '../../shared/validators'

@Component({
  selector: 'ec-password-change-dialog',
  imports: [
    CommonModule,
    FormsModule,
    TuiErrorModule,
    TuiTextfieldControllerModule,
    TuiFieldErrorPipeModule,
    TuiNotificationModule,
    TuiInputPasswordModule,
    ReactiveFormsModule,
    TuiButtonModule,
  ],
  templateUrl: './password-change-dialog.component.html',
  styleUrls: ['./password-change-dialog.component.scss'],
  standalone: true,
})
export class PasswordChangeDialogComponent {
  private alertService = inject(TuiAlertService)
  private customerFacade = inject(CustomerFacade)
  public error = this.customerFacade.errorMessage$

  passwordForm = new FormGroup({
    currentPassword: new FormControl<string | null>('', [
      dataValidator.noWhitespaceValidator,
      dataValidator.lowercaseValidator,
      dataValidator.uppercaseValidator,
      dataValidator.digitValidator,
      dataValidator.lengthValidator,
    ]),
    newPassword: new FormControl<string | null>('', [
      dataValidator.noWhitespaceValidator,
      dataValidator.lowercaseValidator,
      dataValidator.uppercaseValidator,
      dataValidator.digitValidator,
      dataValidator.lengthValidator,
    ]),
  })

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<boolean>,
  ) {}

  changePassword(): void {
    const { currentPassword, newPassword } = this.passwordForm.getRawValue()

    if (!(currentPassword && newPassword)) {
      return
    }

    this.customerFacade.customerChangePassword({ currentPassword, newPassword })

    this.customerFacade.passwordChanged$
      .pipe(
        filter(changed => changed),
        first(),
        map(isLoaded => isLoaded),
      )
      .subscribe(() => {
        this.alertService.open('Password changed', { status: 'success' }).subscribe()
        this.context.completeWith(false)
      })
  }

  cancel(): void {
    this.context.completeWith(false)
  }
}
