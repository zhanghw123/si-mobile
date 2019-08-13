import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceOverviewPage } from './resource-overview.page';

describe('ResourceOverviewPage', () => {
  let component: ResourceOverviewPage;
  let fixture: ComponentFixture<ResourceOverviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceOverviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceOverviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
