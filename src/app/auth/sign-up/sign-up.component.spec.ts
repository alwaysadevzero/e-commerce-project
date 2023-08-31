import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing'
import { ScannedActionsSubject, Store } from '@ngrx/store'
import { TuiButtonModule } from '@taiga-ui/core'
import { TuiDataListWrapperModule, TuiFieldErrorPipeModule, TuiInputModule } from '@taiga-ui/kit'
import { of } from 'rxjs'

// added for mocking http calls
import { SignUpComponent } from './sign-up.component'

describe('SignUpComponent', () => {
  let component: SignUpComponent
  let fixture: ComponentFixture<SignUpComponent>

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        TuiInputModule,
        TuiButtonModule,
        TuiDataListWrapperModule,
        TuiFieldErrorPipeModule,
        HttpClientTestingModule, // Mocking potential HTTP calls made by the component
      ],
      providers: [
        {
          provide: Store,
          useValue: {
            dispatch: jasmine.createSpy('dispatch'),
            select: jasmine.createSpy('select').and.returnValue(of(false)),
          },
        },
        {
          provide: ScannedActionsSubject, // Providing a mocked version of ScannedActionsSubject
          useValue: jasmine.createSpyObj('ScannedActionsSubject', ['next', 'subscribe']),
        },
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
