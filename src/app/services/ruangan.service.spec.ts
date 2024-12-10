import { TestBed } from '@angular/core/testing';

import { RuanganService } from './ruangan.service';

describe('RuanganService', () => {
  let service: RuanganService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RuanganService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
