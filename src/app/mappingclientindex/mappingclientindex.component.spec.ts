import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingclientindexComponent } from './mappingclientindex.component';

describe('MappingclientindexComponent', () => {
  let component: MappingclientindexComponent;
  let fixture: ComponentFixture<MappingclientindexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappingclientindexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingclientindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
