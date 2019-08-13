import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertRecoverPage } from './alert-recover.page';

describe('AlertRecoverPage', () => {
  let component: AlertRecoverPage;
  let fixture: ComponentFixture<AlertRecoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertRecoverPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertRecoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
