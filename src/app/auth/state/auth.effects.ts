import { inject, Injectable } from '@angular/core'
import { type Customer } from '@commercetools/platform-sdk'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'

import type { User } from '../../shared/models/user-data'
import { AuthHttpService } from '../services/auth.service'
import { loadUser, loadUserFailure, loadUserSuccess } from './auth.actions'

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions)
  private authHttpService: AuthHttpService = inject(AuthHttpService)
  loadUser$ = createEffect(() => {
    const actions$ = inject(Actions)
    const authHttpService = inject(AuthHttpService)

    return actions$.pipe(
      ofType(loadUser),
      switchMap(({ user }: { user: User }) =>
        authHttpService.login(user).pipe(
          map((loggedUser: Customer) => loadUserSuccess({ user: loggedUser })),
          catchError((error: string) => of(loadUserFailure({ errorMessage: error }))),
        ),
      ),
    )
  })
}
