import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { TUI_SANITIZER, TuiButtonModule, TuiRootModule } from '@taiga-ui/core'
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify'

import { SignUpFormComponent } from './sign-up-form.component'

describe('SignUpComponent', () => {
  let component: SignUpFormComponent
  let fixture: ComponentFixture<SignUpFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, BrowserAnimationsModule, TuiRootModule, TuiButtonModule, SignUpFormComponent],
      declarations: [],
      providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the SignUpComponent', () => {
    expect(component).toBeTruthy()
  })
})
