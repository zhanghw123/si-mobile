import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertUnrecoverPage } from './alert-unrecover.page';

describe('AlertUnrecoverPage', () => {
  let component: AlertUnrecoverPage;
  let fixture: ComponentFixture<AlertUnrecoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertUnrecoverPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertUnrecoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
