import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollspecialistformComponent } from './payrollspecialistform.component';

describe('PayrollspecialistformComponent', () => {
  let component: PayrollspecialistformComponent;
  let fixture: ComponentFixture<PayrollspecialistformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollspecialistformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollspecialistformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
