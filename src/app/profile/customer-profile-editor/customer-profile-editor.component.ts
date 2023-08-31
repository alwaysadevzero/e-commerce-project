import { Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'ec-customer-profile-editor',
  templateUrl: './customer-profile-editor.component.html',
  styleUrls: ['./customer-profile-editor.component.scss'],
  imports: [ReactiveFormsModule],
  standalone: true,
})
export class CustomerProfileEditorComponent {
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  })
  onSubmit(): void {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value)
  }
}
