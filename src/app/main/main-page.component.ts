import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { RouterModule } from '@angular/router'
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core'
import { TuiActionModule, TuiMarkerIconModule } from '@taiga-ui/kit'

import { CustomerFacade } from '../core/store/customer/customer.facade'

@Component({
  selector: 'ec-main',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  standalone: true,
  imports: [CommonModule, TuiSvgModule, RouterModule, TuiButtonModule, TuiMarkerIconModule, TuiActionModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  private customerFacade = inject(CustomerFacade)
  customerIsLoaded$ = this.customerFacade.customerIsLoaded$
}
