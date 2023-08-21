import type { AbstractControl, ValidationErrors } from '@angular/forms'

export function postalCodeValidator(field: AbstractControl): ValidationErrors | null {
  const country = field.root.get('country')?.value as string

  if (country === 'United States (US)') {
    const postalCodePattern = /^\d{5}(?:[-\s]\d{4})?$/

    if (!postalCodePattern.test(field.value as string)) {
      return {
        postalCode: 'Please enter a valid US postal code (e.g. 12345 or 12345-6789)',
      }
    }
  } else if (country === 'Canada (CA)') {
    const postalCodePattern = /^[ABCEGHJKLMNPRSTVXY]\d[A-Z][ -]?\d[A-Z]\d$/i

    if (!postalCodePattern.test(field.value as string)) {
      return {
        postalCode: 'Please enter a valid Canadian postal code (e.g. A1B 2C3)',
      }
    }
  }

  return null
}

export function postalCodeBillingValidator(field: AbstractControl): ValidationErrors | null {
  const country = field.root.get('countryBilling')?.value as string

  if (country === 'United States (US)') {
    const postalCodePattern = /^\d{5}(?:[-\s]\d{4})?$/

    if (!postalCodePattern.test(field.value as string)) {
      return {
        postalCode: 'Please enter a valid US postal code (e.g. 12345 or 12345-6789)',
      }
    }
  } else if (country === 'Canada (CA)') {
    const postalCodePattern = /^[ABCEGHJKLMNPRSTVXY]\d[A-Z][ -]?\d[A-Z]\d$/i

    if (!postalCodePattern.test(field.value as string)) {
      return {
        postalCode: 'Please enter a valid Canadian postal code (e.g. A1B 2C3)',
      }
    }
  }

  return null
}
