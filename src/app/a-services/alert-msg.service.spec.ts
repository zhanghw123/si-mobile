import { TestBed } from '@angular/core/testing';

import { AlertMsgService } from './alert-msg.service';

describe('AlertMsgService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlertMsgService = TestBed.get(AlertMsgService);
    expect(service).toBeTruthy();
  });
});
