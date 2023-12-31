import { CommonModule } from '@angular/common'
import { Component, inject, Injector, type OnDestroy } from '@angular/core'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TuiDay, TuiInvalidDayException } from '@taiga-ui/cdk'
import {
  TuiButtonModule,
  TuiDialogService,
  TuiErrorModule,
  TuiNotificationModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core'
import {
  TuiFieldErrorPipeModule,
  TuiInputDateModule,
  TuiInputModule,
  TuiInputPasswordModule,
  TuiIslandModule,
  TuiMarkerIconModule,
  TuiSelectModule,
} from '@taiga-ui/kit'
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus'
import type { Subscription } from 'rxjs'
import { distinctUntilChanged, filter, first, take, tap } from 'rxjs/operators'

import { CustomerFacade } from '../../core/store/customer/customer.facade'
import { dataValidator } from '../../shared/validators'
import { PasswordChangeDialogComponent } from '../password-change-dialog/password-change-dialog.component'

@Component({
  selector: 'ec-customer-profile-editor',
  templateUrl: './customer-profile-editor.component.html',
  styleUrls: ['./customer-profile-editor.component.scss'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    TuiErrorModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiSelectModule,
    TuiInputDateModule,
    TuiFieldErrorPipeModule,
    TuiNotificationModule,
    TuiInputPasswordModule,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiIslandModule,
    TuiMarkerIconModule,
    TuiSvgModule,
    PasswordChangeDialogComponent,
  ],

  standalone: true,
})
export class CustomerProfileEditorComponent {
  private customerFacade = inject(CustomerFacade)
  private dialogs = inject(TuiDialogService)
  private injector = inject(Injector)
  public editMode = false

  profileForm = new FormGroup({
    firstName: new FormControl<string | null>('', [dataValidator.nameValidator]),
    lastName: new FormControl<string | null>('', [dataValidator.nameValidator]),
    email: new FormControl<string | null>('', [
      dataValidator.noWhitespaceValidator,
      dataValidator.atValidator,
      dataValidator.domainValidator,
      dataValidator.formatValidator,
    ]),
    dateOfBirth: new FormControl<TuiDay | null>(new TuiDay(2000, 0, 1), [dataValidator.dateOfBirthValidator]),
  })

  constructor() {
    this.updateProfileForm()
    this.profileForm.disable()
  }

  public changePassword(): void {
    this.dialogs.open(new PolymorpheusComponent(PasswordChangeDialogComponent, this.injector)).subscribe()
  }

  private createTuiDayFromDateStr(dateStr: string): TuiDay {
    const [year, month, day] = dateStr.split('-').map(part => parseInt(part, 10))

    return new TuiDay(year, month - 1, day)
  }

  private updateProfileForm(): void {
    this.customerFacade.customer$
      .pipe(
        first(),
        tap(customer => {
          if (customer) {
            const { firstName, lastName, dateOfBirth, email } = customer
            this.profileForm.patchValue({
              firstName,
              lastName,
              dateOfBirth: dateOfBirth ? this.createTuiDayFromDateStr(dateOfBirth) : null,
              email,
            })
          }
        }),
      )
      .subscribe()
  }

  onSubmit(): void {
    const { email, firstName, lastName, dateOfBirth } = this.profileForm.getRawValue()

    if (email && firstName && lastName && dateOfBirth) {
      this.customerFacade.updateDetails({
        email,
        firstName,
        lastName,
        dateOfBirth: dateOfBirth.toJSON(),
      })

      this.customerFacade.detailsUpdated$
        .pipe(
          filter(updated => updated),
          first(),
          tap(updated => {
            if (updated) {
              this.updateProfileForm()
              this.profileForm.disable()
            }
          }),
        )
        .subscribe()
    }
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode

    if (this.editMode) {
      this.profileForm.enable()
    } else {
      this.updateProfileForm()
      this.profileForm.disable()
    }
  }
}
