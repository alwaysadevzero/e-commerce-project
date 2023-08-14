import type { AbstractControl, ValidationErrors } from '@angular/forms'

export function streetValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value as string
  const hasAtLeastOneCharacter = value?.trim()?.length > 0

  if (!hasAtLeastOneCharacter) {
    return {
      name: 'Please enter a value with at least one character',
    }
  }

  return null
}
