import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { CustomerFacade } from '../core/store/customer/customer.facade'

@NgModule({
  imports: [CommonModule, RouterModule],
  providers: [CustomerFacade],
})
export class AuthModule {}
