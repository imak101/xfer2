import { TestBed } from '@angular/core/testing';

import { XferLocalStorageService } from './xfer-local-storage.service';

describe('XferLocalStorageService', () => {
  let service: XferLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XferLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
