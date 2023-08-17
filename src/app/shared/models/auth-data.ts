export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  username: string
  password: string
}

export interface UserReference {
  typeId: string
  id: string
}

export interface ModifiedInfo {
  isPlatformClient: boolean
  user?: UserReference
}

export interface MessagesSettings {
  deleteDaysAfterCreation: number
  enabled: boolean
}

export interface SearchIndexingSettings {
  orders: {
    lastModifiedAt: string
    lastModifiedBy: ModifiedInfo
    status: string
  }
}

export interface AuthResponse {
  allowAddingUnpublishedProducts: boolean
  cartDiscountCache: {
    enabled: boolean
  }
  countryTaxRateFallbackEnabled: boolean
  deleteDaysAfterLastModification: number
  countries: string[]
  createdAt: string
  createdBy: ModifiedInfo
  currencies: string[]
  key: string
  languages: string[]
  lastModifiedAt: string
  lastModifiedBy: ModifiedInfo
  messages: MessagesSettings
  name: string
  searchIndexing: SearchIndexingSettings
  products: {
    status: string
  }
  shoppingLists: {
    deleteDaysAfterLastModification: number
  }
  trialUntil: string
  version: number
}
