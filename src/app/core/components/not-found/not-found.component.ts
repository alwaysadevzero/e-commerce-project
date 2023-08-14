/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { TuiButtonModule } from '@taiga-ui/core'
import { TuiBlockStatusModule } from '@taiga-ui/layout'

import { HeaderComponent } from 'src/app/core/components/header/header.component'

@Component({
  selector: 'ec-not-found',
  standalone: true,
  imports: [CommonModule, TuiBlockStatusModule, TuiButtonModule, RouterModule, HeaderComponent],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {
  description = 'Not found page'
}
