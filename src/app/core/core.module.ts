import { CommonModule } from '@angular/common'
import { NgModule, type OnInit } from '@angular/core'
import { Store } from '@ngrx/store'

import { loadUser } from '../auth/state/auth.actions'

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class CoreModule {
  constructor(private store$: Store) {
    this.store$.dispatch(loadUser())
  }

  // public ngOnInit(): void {
  //   console.log(this.store$)
  // }
}
