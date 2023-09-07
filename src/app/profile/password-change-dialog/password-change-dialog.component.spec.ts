import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { StoreModule } from '@ngrx/store'
import { TUI_SANITIZER, TuiButtonModule, TuiRootModule } from '@taiga-ui/core'
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify'
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus'

import { PasswordChangeDialogComponent } from './password-change-dialog.component'
import { HeaderComponent } from 'src/app/core/components/header/header.component'
import { CustomerFacade } from 'src/app/core/store/customer/customer.facade'

describe('PasswordChangeDialogComponent', () => {
  let component: PasswordChangeDialogComponent
  let fixture: ComponentFixture<PasswordChangeDialogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        TuiRootModule,
        TuiButtonModule,
        PasswordChangeDialogComponent,
        HeaderComponent,
        StoreModule.forRoot(),
      ],
      providers: [
        { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
        { provide: POLYMORPHEUS_CONTEXT, useClass: NgDompurifySanitizer },
        CustomerFacade,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordChangeDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the PasswordChangeDialogComponent', () => {
    expect(component).toBeTruthy()
  })
})
