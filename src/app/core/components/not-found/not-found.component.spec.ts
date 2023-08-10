import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { TUI_SANITIZER, TuiButtonModule, TuiRootModule } from '@taiga-ui/core'
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify'

import { NotFoundComponent } from './not-found.component'

describe('NotFoundComponent', () => {
  let component: NotFoundComponent
  let fixture: ComponentFixture<NotFoundComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, BrowserAnimationsModule, TuiRootModule, TuiButtonModule, NotFoundComponent],
      declarations: [],
      providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the NotFoundComponent', () => {
    expect(component).toBeTruthy()
  })
})
