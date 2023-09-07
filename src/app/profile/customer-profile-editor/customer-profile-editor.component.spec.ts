import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { StoreModule } from '@ngrx/store'
import { TUI_SANITIZER, TuiButtonModule, TuiRootModule } from '@taiga-ui/core'
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify'

import { CustomerProfileEditorComponent } from './customer-profile-editor.component'
import { HeaderComponent } from 'src/app/core/components/header/header.component'
import { CustomerFacade } from 'src/app/core/store/customer/customer.facade'

describe('CustomerProfileEditorComponent', () => {
  let component: CustomerProfileEditorComponent
  let fixture: ComponentFixture<CustomerProfileEditorComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        TuiRootModule,
        TuiButtonModule,
        HeaderComponent,
        StoreModule.forRoot({}),
      ],
      declarations: [],
      providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }, CustomerFacade],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerProfileEditorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the HeaderComponent', () => {
    expect(component).toBeTruthy()
  })
})
