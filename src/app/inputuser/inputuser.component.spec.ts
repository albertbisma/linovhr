import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputuserComponent } from './inputuser.component';

describe('InputuserComponent', () => {
  let component: InputuserComponent;
  let fixture: ComponentFixture<InputuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
