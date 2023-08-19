import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { TuiDay } from '@taiga-ui/cdk'
import { TUI_SANITIZER, TuiButtonModule, TuiRootModule } from '@taiga-ui/core'
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify'

import { SignUpComponent } from './sign-up.component'

describe('SignUpComponent', () => {
  let component: SignUpComponent
  let fixture: ComponentFixture<SignUpComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, BrowserAnimationsModule, TuiRootModule, TuiButtonModule, SignUpComponent],
      providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
    }).compileComponents()

    fixture = TestBed.createComponent(SignUpComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the SignUpComponent', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize the registrationForm with empty values', () => {
    expect(component.registrationForm.value).toEqual({
      email: '',
      password: '',
      confirm: '',
      firstName: '',
      lastName: '',
      dateOfBirth: new TuiDay(2000, 0, 1),
      street: '',
      city: '',
      country: '',
      postalCode: '',
      streetBilling: '',
      cityBilling: '',
      countryBilling: '',
      postalCodeBilling: '',
      shipping: false,
      billing: false,
      shippingToBilling: false,
      shippingAndBilling: false,
    })
  })
})
