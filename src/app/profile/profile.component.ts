import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'

@Component({
  selector: 'ec-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {}
