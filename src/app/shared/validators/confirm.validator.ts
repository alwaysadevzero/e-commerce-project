import type { AbstractControl, ValidationErrors } from '@angular/forms'

export function confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
  const password = String(control.root.get('password')?.value)
  const confirm = String(control.value)

  return password && confirm && password === confirm ? null : { confirmPassword: 'Passwords do not match' }
}
