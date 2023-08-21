import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { ApiClientBuilderService } from '../core/services/api-client-builder.service'
import { AuthFacade } from './state/auth.facade'

@NgModule({
  imports: [CommonModule, RouterModule],
  providers: [AuthFacade, ApiClientBuilderService],
})
export class AuthModule {}
