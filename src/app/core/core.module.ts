import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { Store } from '@ngrx/store'

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class CoreModule {
  constructor(private store$: Store) {}
}
