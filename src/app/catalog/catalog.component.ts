import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'

@Component({
  selector: 'ec-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent {
  constructor() {
    // eslint-disable-next-line no-alert
    alert('Прошу подождать до вечера 7-го числа. Пока реализован profile.')
  }
}
