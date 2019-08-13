import { TestBed } from '@angular/core/testing';

import { SaveSubresourceService } from './save-subresource.service';

describe('SaveSubresourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaveSubresourceService = TestBed.get(SaveSubresourceService);
    expect(service).toBeTruthy();
  });
});
