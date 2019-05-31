import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementformComponent } from './managementform.component';

describe('ManagementformComponent', () => {
  let component: ManagementformComponent;
  let fixture: ComponentFixture<ManagementformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
