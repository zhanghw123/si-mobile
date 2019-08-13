import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertTabsPage } from './alert-tabs.page';

describe('AlertTabsPage', () => {
  let component: AlertTabsPage;
  let fixture: ComponentFixture<AlertTabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertTabsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
