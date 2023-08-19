import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { Store } from '@ngrx/store'
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiErrorModule,
  TuiHintModule,
  TuiHostedDropdownModule,
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

import type { User } from '../../shared/models/user-data'
import { dataValidator } from '../../shared/validators'
import { AuthHttpService } from '../services/auth.service'
import { loginUser } from '../state/auth.actions'
import { selectErrorMessage, selectIsLoading } from '../state/auth.selector'

@Component({
  selector: 'ec-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
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
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  title = 'Login'
  private formBuilder: FormBuilder = inject(FormBuilder)
  private authService: AuthHttpService = inject(AuthHttpService)

  public error = this.store$.select(selectErrorMessage)
  constructor(private store$: Store) {
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
      const user: User = { username: email, password }
      this.store$.dispatch(loginUser({ user }))
    }
  }

  get email(): FormControl<string | null> {
    return this.loginForm.controls.email
  }

  get password(): FormControl<string | null> {
    return this.loginForm.controls.password
  }
}
