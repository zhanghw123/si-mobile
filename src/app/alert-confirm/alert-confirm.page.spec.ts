import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertConfirmPage } from './alert-confirm.page';

describe('AlertConfirmPage', () => {
  let component: AlertConfirmPage;
  let fixture: ComponentFixture<AlertConfirmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertConfirmPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertConfirmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
