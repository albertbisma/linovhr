import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementindexComponent } from './managementindex.component';

describe('ManagementindexComponent', () => {
  let component: ManagementindexComponent;
  let fixture: ComponentFixture<ManagementindexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementindexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
