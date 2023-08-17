import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap, tap } from 'rxjs/operators'

import { AuthHttpService } from '../services/auth.service'
import { loadUser, loadUserSuccess } from './auth.actions'

@Injectable()
export class UserEffects {
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser),
      // tap(response => console.log),
      // switchMap(action => console
      // this.authHttpService.login(action.email, action.password).pipe(map(project => loadUserSuccess({ project }))),
      // ),
    ),
  )

  constructor(
    private actions$: Actions,
    private authHttpService: AuthHttpService,
  ) {}
}
