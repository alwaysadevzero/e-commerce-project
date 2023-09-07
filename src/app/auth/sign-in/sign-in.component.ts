import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
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
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPasswordModule,
  TuiSelectModule,
  TuiTextAreaModule,
} from '@taiga-ui/kit'

import { CustomerFacade } from '../../core/store/customer/customer.facade'
import { dataValidator } from '../../shared/validators'
import { AuthModule } from '../auth.module'

@Component({
  selector: 'ec-sign-in',
  standalone: true,
  imports: [
    RouterModule,
    AuthModule,
    CommonModule,
    TuiInputModule,
    TuiInputPasswordModule,
    ReactiveFormsModule,
    TuiTextAreaModule,
    TuiHostedDropdownModule,
    TuiDataListModule,
    TuiSelectModule,
    TuiDataListWrapperModule,
    FormsModule,
    TuiButtonModule,
    TuiFieldErrorPipeModule,
    TuiErrorModule,
    TuiHintModule,
    TuiTextfieldControllerModule,
    TuiNotificationModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  private formBuilder: FormBuilder = inject(FormBuilder)
  private customerFacade = inject(CustomerFacade)
  public error = this.customerFacade.errorMessage$

  constructor() {
    this.registerInputEventListeners()
  }

  public loginForm = this.formBuilder.group({
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
  })

  private registerInputEventListeners(): void {
    Object.keys(this.loginForm.controls).forEach(controlName => {
      const control = this.loginForm.get(controlName)

      if (control) {
        const subscription = control.valueChanges.subscribe(() => {
          control.markAsTouched()
          subscription.unsubscribe()
        })
      }
    })
  }

  public submitForm(): void {
    const { email, password } = this.loginForm.value

    if (email && password) {
      const user = { username: email, password }
      this.customerFacade.loginCustomer(user)

      const formValueChangesSubscription = this.loginForm.valueChanges.subscribe(() => {
        this.customerFacade.clearErrorMessage()
        formValueChangesSubscription.unsubscribe()
      })
    }
  }

  get email(): FormControl<string | null> {
    return this.loginForm.controls.email
  }

  get password(): FormControl<string | null> {
    return this.loginForm.controls.password
  }
}
