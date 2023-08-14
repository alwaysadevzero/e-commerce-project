import type { AbstractControl, ValidationErrors } from '@angular/forms'

export function nameValidator(field: AbstractControl): ValidationErrors | null {
  const namePattern = /^[a-zA-Z\s]+$/

  if (!namePattern.test(field.value as string)) {
    return {
      name: `Please enter a valid name with at least one latin character, without special characters or digits`,
    }
  }

  return null
}
