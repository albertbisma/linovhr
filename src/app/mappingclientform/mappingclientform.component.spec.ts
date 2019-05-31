import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingclientformComponent } from './mappingclientform.component';

describe('MappingclientformComponent', () => {
  let component: MappingclientformComponent;
  let fixture: ComponentFixture<MappingclientformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappingclientformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingclientformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
