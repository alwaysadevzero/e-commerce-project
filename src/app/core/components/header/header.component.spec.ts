import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { StoreModule } from '@ngrx/store'
import { TUI_SANITIZER, TuiButtonModule, TuiRootModule } from '@taiga-ui/core'
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify'

import { HeaderComponent } from './header.component'
import { AuthFacade } from 'src/app/auth/state/auth.facade'

describe('HeaderComponent', () => {
  let component: HeaderComponent
  let fixture: ComponentFixture<HeaderComponent>

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
      providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }, AuthFacade],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the HeaderComponent', () => {
    expect(component).toBeTruthy()
  })
})
