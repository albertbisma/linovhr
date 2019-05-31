import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewtaskformComponent } from './newtaskform.component';

describe('NewtaskformComponent', () => {
  let component: NewtaskformComponent;
  let fixture: ComponentFixture<NewtaskformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewtaskformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewtaskformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
