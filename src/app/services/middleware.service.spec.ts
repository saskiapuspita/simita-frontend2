import { TestBed } from '@angular/core/testing';

import { MiddlewareService } from './middleware.service';

describe('MiddlewareService', () => {
  let service: MiddlewareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiddlewareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
