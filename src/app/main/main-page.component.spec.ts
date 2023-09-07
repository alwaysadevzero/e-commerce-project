import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { Store, StoreModule } from '@ngrx/store'
import { TUI_SANITIZER, TuiButtonModule, TuiRootModule } from '@taiga-ui/core'
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify'
import { of } from 'rxjs'

import { CustomerFacade } from '../core/store/customer/customer.facade'
import { MainComponent } from './main-page.component'

describe('MainComponent', () => {
  let component: MainComponent
  let fixture: ComponentFixture<MainComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        TuiRootModule,
        TuiButtonModule,
        MainComponent,
        StoreModule.forRoot(),
      ],
      providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }, CustomerFacade],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the MainComponent', () => {
    expect(component).toBeTruthy()
  })
})
