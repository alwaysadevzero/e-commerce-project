import { type ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing'
import { Store } from '@ngrx/store'
import { TuiButtonModule } from '@taiga-ui/core'
import { TuiDataListWrapperModule, TuiFieldErrorPipeModule, TuiInputModule } from '@taiga-ui/kit'
import { of } from 'rxjs'

import { SignInComponent } from './sign-in.component'

describe('SignInComponent', () => {
  let component: SignInComponent
  let fixture: ComponentFixture<SignInComponent>

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        TuiInputModule,
        TuiButtonModule,
        TuiDataListWrapperModule,
        TuiFieldErrorPipeModule,
      ],
      providers: [
        {
          provide: Store,
          useValue: {
            dispatch: jasmine.createSpy('dispatch'),
            select: jasmine.createSpy('select').and.returnValue(of(false)),
          },
        },
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
