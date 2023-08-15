import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
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

import { atValidator } from 'src/app/shared/validators/at.validator'
import { digitValidator } from 'src/app/shared/validators/digit.validator'
import { domainValidator } from 'src/app/shared/validators/domain.validator'
import { formatValidator } from 'src/app/shared/validators/format.validator'
import { lengthValidator } from 'src/app/shared/validators/length.validator'
import { lowercaseValidator } from 'src/app/shared/validators/lowercase.validator'
import { uppercaseValidator } from 'src/app/shared/validators/uppercase.validator'
import { noWhitespaceValidator } from 'src/app/shared/validators/whitespace.validator'

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

  constructor(private formBuilder: FormBuilder) {
    this.registerInputEventListeners()
  }
  public loginForm = this.formBuilder.group({
    email: new FormControl<string | null>('', [noWhitespaceValidator, atValidator, domainValidator, formatValidator]),
    password: new FormControl<string | null>('', [
      noWhitespaceValidator,
      lowercaseValidator,
      uppercaseValidator,
      digitValidator,
      lengthValidator,
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
    if (this.loginForm.valid) {
      this.loginForm.disable()
    } else {
      this.loginForm.enable()
    }
  }

  get email(): FormControl<string | null> {
    return this.loginForm.controls.email
  }

  get password(): FormControl<string | null> {
    return this.loginForm.controls.password
  }
}
