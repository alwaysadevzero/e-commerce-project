import type { AbstractControl, ValidationErrors } from '@angular/forms'

export function dateOfBirthValidator(field: AbstractControl): ValidationErrors | null {
  const value = field.value as Date

  if (!value) {
    return null
  }

  const currentDate = new Date()
  const minimumAllowedDate = new Date(currentDate.getFullYear() - 13, currentDate.getMonth(), currentDate.getDate())

  if (value > minimumAllowedDate) {
    return { dateOfBirth: 'You must be at least 13 years old' }
  }

  return null
}
