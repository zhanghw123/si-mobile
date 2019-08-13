import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceListPage } from './resource-list.page';

describe('ResourceListPage', () => {
  let component: ResourceListPage;
  let fixture: ComponentFixture<ResourceListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
