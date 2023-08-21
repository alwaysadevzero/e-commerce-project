import type { AbstractControl, ValidationErrors } from '@angular/forms'

export function lengthValidator(control: AbstractControl): ValidationErrors | null {
  if (typeof control.value === 'string' && control.value.length < 8) {
    return { length: 'Password must be at least 8 characters long' }
  }

  return null
}
