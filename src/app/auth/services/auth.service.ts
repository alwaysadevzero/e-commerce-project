import { inject, Injectable } from '@angular/core'
import { type Project } from '@commercetools/platform-sdk'
import { type Observable } from 'rxjs'
import { fromPromise } from 'rxjs/internal/observable/innerFrom'
import { map } from 'rxjs/operators'

import { ApiClientBuilderService } from '../../core/services/api-client-builder.service'

@Injectable({
  providedIn: 'root',
})
export class AuthHttpService {
  private apiClientBuilderService: ApiClientBuilderService = inject(ApiClientBuilderService)

  public login({ username, password }: { username: string; password: string }): Observable<Project> {
    return fromPromise(
      this.apiClientBuilderService.createApiClientWithPasswordFlow(username, password).get().execute(),
    ).pipe(map(({ body }) => body))
  }
}
