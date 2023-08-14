import { Component } from '@angular/core'

import { HeaderComponent } from '../core/components/header/header.component'

@Component({
  selector: 'ec-main',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  standalone: true,
  imports: [HeaderComponent],
})
export class MainComponent {}
