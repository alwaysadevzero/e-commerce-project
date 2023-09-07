import { TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { EffectsModule } from '@ngrx/effects'
import { StateObservable, Store, StoreModule } from '@ngrx/store'
import { TUI_SANITIZER, TuiAlertModule, TuiDialogModule, TuiRootModule } from '@taiga-ui/core'
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify'

import { AppComponent } from './app.component'
import { HeaderComponent } from './core/components/header/header.component'
import { CustomerEffects } from './core/store/customer/customer.effects'
import { CustomerFacade } from './core/store/customer/customer.facade'
import { customerReducer } from './core/store/customer/customer.reducer'

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        TuiRootModule,
        TuiDialogModule,
        TuiAlertModule,
        HeaderComponent,
        StoreModule.forRoot({ customerState: customerReducer }),
        EffectsModule.forRoot([CustomerEffects]),
      ],
      declarations: [AppComponent],
      providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }, CustomerFacade, Store, StateObservable],
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it(`should have as title 'e-commerce'`, () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app.title).toEqual('e-commerce')
  })

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent)
    fixture.detectChanges()
  })
})
