import { type ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing'
import { ScannedActionsSubject, Store } from '@ngrx/store'
import { TuiButtonModule } from '@taiga-ui/core'
import { TuiDataListWrapperModule, TuiFieldErrorPipeModule, TuiInputModule } from '@taiga-ui/kit'
import { of } from 'rxjs'

import { AuthModule } from '../auth.module'
import { SignInComponent } from './sign-in.component'
import { CustomerFacade } from 'src/app/core/store/customer/customer.facade'

describe('SignInComponent', () => {
  let component: SignInComponent
  let fixture: ComponentFixture<SignInComponent>

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      imports: [
        AuthModule,
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
        {
          provide: ScannedActionsSubject,
          useValue: jasmine.createSpyObj('ScannedActionsSubject', ['next', 'subscribe']), // mock methods you use from ScannedActionsSubject
        },
        CustomerFacade,
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
