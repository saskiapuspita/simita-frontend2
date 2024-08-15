import { TestBed } from '@angular/core/testing';

import { InterestApiService } from './interest-api.service';

describe('InterestApiService', () => {
  let service: InterestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterestApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
