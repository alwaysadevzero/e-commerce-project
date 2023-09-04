import { type ComponentFixture, TestBed } from '@angular/core/testing'

import { CustomerProfileEditorComponent } from './customer-profile-editor.component'

describe('CustomerProfileEditorComponent', () => {
  let component: CustomerProfileEditorComponent
  let fixture: ComponentFixture<CustomerProfileEditorComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerProfileEditorComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(CustomerProfileEditorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
