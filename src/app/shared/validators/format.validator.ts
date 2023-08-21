import type { AbstractControl, ValidationErrors } from '@angular/forms'

export function formatValidator(control: AbstractControl): ValidationErrors | null {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  if (!emailPattern.test(control.value as string)) {
    return { format: 'Please enter a valid email address (e.g. name@example.com)' }
  }

  return null
}
