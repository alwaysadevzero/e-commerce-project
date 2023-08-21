import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { RouterModule } from '@angular/router'
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core'
import { TuiTabsModule } from '@taiga-ui/kit'
import { map } from 'rxjs'

import { LoadStatus } from '../../../auth/enums/load.enum'
import { AuthFacade } from '../../../auth/state/auth.facade'

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

  isLoggedIn$ = this.authFacade.userLoadStatus$.pipe(map((status: LoadStatus) => status === LoadStatus.loaded))

  public logout(): void {
    this.authFacade.logout()
  }
}
