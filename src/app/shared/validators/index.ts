import { atValidator } from './at.validator'
import { confirmPasswordValidator } from './confirm.validator'
import { dateOfBirthValidator } from './date-of-birth.validator'
import { digitValidator } from './digit.validator'
import { domainValidator } from './domain.validator'
import { formatValidator } from './format.validator'
import { lengthValidator } from './length.validator'
import { lowercaseValidator } from './lowercase.validator'
import { nameValidator } from './name.validator'
import { postalCodeBillingValidator, postalCodeValidator } from './postal-code.validator'
import { streetValidator } from './street.validator'
import { uppercaseValidator } from './uppercase.validator'
import { noWhitespaceValidator } from './whitespace.validator'

export const dataValidator = {
  atValidator,
  confirmPasswordValidator,
  dateOfBirthValidator,
  digitValidator,
  domainValidator,
  formatValidator,
  lengthValidator,
  lowercaseValidator,
  nameValidator,
  postalCodeValidator,
  postalCodeBillingValidator,
  streetValidator,
  uppercaseValidator,
  noWhitespaceValidator,
}
