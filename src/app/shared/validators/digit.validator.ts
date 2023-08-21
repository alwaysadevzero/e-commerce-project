import type { AbstractControl, ValidationErrors } from '@angular/forms'

export function digitValidator(control: AbstractControl): ValidationErrors | null {
  if (!/(?=.*\d)/.test(control.value as string)) {
    return { digit: 'Password must contain at least one digit' }
  }

  return null
}
