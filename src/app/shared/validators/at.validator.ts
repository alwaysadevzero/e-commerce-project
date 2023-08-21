import type { AbstractControl, ValidationErrors } from '@angular/forms'

export function atValidator(control: AbstractControl): ValidationErrors | null {
  if (!(control.value as string).includes('@')) {
    return { symbol: "Email address must contain an '@' symbol separating local part and domain name" }
  }

  return null
}
