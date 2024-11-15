import { TestBed } from '@angular/core/testing';

import { XferDataEntryMathService } from './xfer-data-entry-math.service';

describe('XferDataMathService', () => {
  let service: XferDataEntryMathService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XferDataEntryMathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
