import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceHostPage } from './resource-host.page';

describe('ResourceHostPage', () => {
  let component: ResourceHostPage;
  let fixture: ComponentFixture<ResourceHostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceHostPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceHostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
