import { type ComponentFixture, TestBed } from '@angular/core/testing'
import { Store, StoreModule } from '@ngrx/store'
import { TuiDialogService } from '@taiga-ui/core'
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus'
import { of } from 'rxjs'

import { AddressDialogComponent } from './address-dialog.component'

describe('AddressDialogComponent', () => {
  let component: AddressDialogComponent
  let fixture: ComponentFixture<AddressDialogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressDialogComponent, StoreModule.forRoot({})],
      providers: [
        TuiDialogService,
        { provide: POLYMORPHEUS_CONTEXT, useValue: {} }, // Mock value for POLYMORPHEUS_CONTEXT
        {
          provide: Store,
          useValue: {
            dispatch: jasmine.createSpy('dispatch'),
            select: jasmine.createSpy('select').and.returnValue(of(false)),
          },
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
