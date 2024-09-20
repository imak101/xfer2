import { TestBed } from '@angular/core/testing';

import { XferDatabaseService } from './xfer-database.service';

describe('XferDatabaseService', () => {
  let service: XferDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XferDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
