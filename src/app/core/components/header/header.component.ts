import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core'
import { of } from 'rxjs'

@Component({
  selector: 'ec-header',
  standalone: true,
  imports: [CommonModule, TuiSvgModule, RouterModule, TuiButtonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  title = 'Header'
  src = '../../../../assets/icons/logo.svg'
  isLoggedIn$ = of(false)
}
