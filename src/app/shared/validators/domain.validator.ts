import type { AbstractControl, ValidationErrors } from '@angular/forms'

export function domainValidator(control: AbstractControl): ValidationErrors | null {
  const emailParts = (control.value as string).split('@')

  if (emailParts.length !== 2 || !emailParts[1].includes('.')) {
    return { domain: 'Email address must contain a domain name (e.g. example.com)' }
  }

  return null
}
