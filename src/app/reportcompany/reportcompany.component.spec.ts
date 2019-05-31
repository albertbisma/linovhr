import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportcompanyComponent } from './reportcompany.component';

describe('ReportcompanyComponent', () => {
  let component: ReportcompanyComponent;
  let fixture: ComponentFixture<ReportcompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportcompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportcompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
