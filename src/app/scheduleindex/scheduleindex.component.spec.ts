import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleindexComponent } from './scheduleindex.component';

describe('ScheduleindexComponent', () => {
  let component: ScheduleindexComponent;
  let fixture: ComponentFixture<ScheduleindexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleindexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
