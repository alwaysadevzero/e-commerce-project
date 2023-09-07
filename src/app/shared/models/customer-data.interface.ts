export interface CustomerCredential {
  username: string
  password: string
}

export interface PasswordCredential {
  currentPassword: string
  newPassword: string
}

export interface CustomerDetails {
  firstName: string
  lastName: string
  email: string
  dateOfBirth: string
}

export interface CustomerAddress {
  addressId: string
  streetName: string
  city: string
  postalCode: string
  country: string
}
