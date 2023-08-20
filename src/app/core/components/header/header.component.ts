import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core'
import { TuiTabsModule } from '@taiga-ui/kit'
import { of } from 'rxjs'

@Component({
  selector: 'ec-header',
  standalone: true,
  imports: [CommonModule, TuiSvgModule, RouterModule, TuiButtonModule, TuiTabsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isLoggedIn$ = of(false)

  activeItemIndex = 0
}
