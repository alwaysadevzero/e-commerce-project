import type { AbstractControl, ValidationErrors } from '@angular/forms'

export function lowercaseValidator(control: AbstractControl): ValidationErrors | null {
  if (!/(?=.*[a-z])/.test(control.value as string)) {
    return { lowercase: 'Password must contain at least one latin lowercase letter' }
  }

  return null
}
