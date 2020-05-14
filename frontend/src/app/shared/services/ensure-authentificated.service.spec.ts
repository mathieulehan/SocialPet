import { TestBed } from '@angular/core/testing';

import { EnsureAuthentificatedService } from './ensure-authentificated.service';

describe('EnsureAuthentificatedService', () => {
  let service: EnsureAuthentificatedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnsureAuthentificatedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
