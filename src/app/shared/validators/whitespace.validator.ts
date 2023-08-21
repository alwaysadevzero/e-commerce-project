import type { AbstractControl, ValidationErrors } from '@angular/forms'

export function noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
  if (typeof control.value === 'string' && /\s/.test(control.value)) {
    return { whitespace: 'Password must not contain whitespace' }
  }

  return null
}
