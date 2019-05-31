import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskindexComponent } from './taskindex.component';

describe('TaskindexComponent', () => {
  let component: TaskindexComponent;
  let fixture: ComponentFixture<TaskindexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskindexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
