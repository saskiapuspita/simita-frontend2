import { TestBed } from '@angular/core/testing';

import { LokasiPklService } from './lokasi-pkl.service';

describe('LokasiPklService', () => {
  let service: LokasiPklService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LokasiPklService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
