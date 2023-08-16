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

import { dataValidator } from '../../shared/validators'

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
