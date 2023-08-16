import { Injectable } from '@angular/core'

import { ApiClientBuilderService } from 'src/app/core/services/api-client-builder.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(apiClientBuilderService: ApiClientBuilderService) {
    // console.log(apiClientBuilderService)
  }
}
