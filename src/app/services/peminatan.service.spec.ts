import { TestBed } from '@angular/core/testing';

import { PeminatanService } from './peminatan.service';

describe('PeminatanService', () => {
  let service: PeminatanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeminatanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
