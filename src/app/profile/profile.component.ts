import { Component, inject } from '@angular/core'

import { ProfileHttpService } from './services/profile.service'
import { ProfileFacade } from './state/profile.facade'

@Component({
  selector: 'ec-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  private profileFacade = inject(ProfileFacade)
  public changePassword(): void {
    this.profileFacade.customerChangePassword({ currentPassword: 'aaaaaa1A', newPassword: 'aaaaaa1A' })
  }
}
