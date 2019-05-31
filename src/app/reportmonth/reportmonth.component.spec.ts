import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportmonthComponent } from './reportmonth.component';

describe('ReportmonthComponent', () => {
  let component: ReportmonthComponent;
  let fixture: ComponentFixture<ReportmonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportmonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportmonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
