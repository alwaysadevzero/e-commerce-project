import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { AuthModule } from '../auth/auth.module'

@NgModule({
  imports: [CommonModule, AuthModule],
})
export class CoreModule {}
