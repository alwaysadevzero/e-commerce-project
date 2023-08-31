import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { RouterModule } from '@angular/router'
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core'
import { TuiTabsModule } from '@taiga-ui/kit'

import { CustomerFacade } from '../../store/customer/customer.facade'

@Component({
  selector: 'ec-header',
  standalone: true,
  imports: [CommonModule, TuiSvgModule, RouterModule, TuiButtonModule, TuiTabsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private customerFacade = inject(CustomerFacade)

  activeItemIndex = 0

  isLoggedIn$ = this.customerFacade.customerIsLoaded$

  public logout(): void {
    this.customerFacade.logoutCustomer()
  }
}
