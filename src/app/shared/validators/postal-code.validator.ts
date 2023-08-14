import type { AbstractControl, ValidationErrors } from '@angular/forms'

export function postalCodeValidator(field: AbstractControl): ValidationErrors | null {
  const country = field.root.get('country')?.value as string

  if (country === 'U.S') {
    const postalCodePattern = /^\d{5}(?:[-\s]\d{4})?$/

    if (!postalCodePattern.test(field.value as string)) {
      return {
        postalCode: 'Please enter a valid U.S postal code (e.g. 12345 or 12345-6789)',
      }
    }
  } else if (country === 'Canada') {
    const postalCodePattern = /^[ABCEGHJKLMNPRSTVXY]\d[A-Z][ -]?\d[A-Z]\d$/i

    if (!postalCodePattern.test(field.value as string)) {
      return {
        postalCode: 'Please enter a valid Canadian postal code (e.g. A1B 2C3)',
      }
    }
  }

  return null
}
