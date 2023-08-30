import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { RouterModule } from '@angular/router'
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core'
import { TuiTabsModule } from '@taiga-ui/kit'
import { map } from 'rxjs'

import { AuthFacade } from '../../../auth/state/auth.facade'
import { LoadStatus } from '../../enums/load.enum'

@Component({
  selector: 'ec-header',
  standalone: true,
  imports: [CommonModule, TuiSvgModule, RouterModule, TuiButtonModule, TuiTabsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private authFacade: AuthFacade = inject(AuthFacade)

  activeItemIndex = 0

  isLoggedIn$ = this.authFacade.customerIsLoaded$

  public logout(): void {
    this.authFacade.logoutCustomer()
  }
}
