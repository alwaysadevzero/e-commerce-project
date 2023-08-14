import type { AbstractControl, ValidationErrors } from '@angular/forms'

export function uppercaseValidator(control: AbstractControl): ValidationErrors | null {
  if (!/(?=.*[A-Z])/.test(control.value as string)) {
    return { uppercase: 'Password must contain at least one latin uppercase letter' }
  }

  return null
}
