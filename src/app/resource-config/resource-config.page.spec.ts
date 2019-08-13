import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceConfigPage } from './resource-config.page';

describe('ResourceConfigPage', () => {
  let component: ResourceConfigPage;
  let fixture: ComponentFixture<ResourceConfigPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceConfigPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceConfigPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
