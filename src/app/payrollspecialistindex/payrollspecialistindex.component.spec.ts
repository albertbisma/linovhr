import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollspecialistindexComponent } from './payrollspecialistindex.component';

describe('PayrollspecialistindexComponent', () => {
  let component: PayrollspecialistindexComponent;
  let fixture: ComponentFixture<PayrollspecialistindexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollspecialistindexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollspecialistindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
