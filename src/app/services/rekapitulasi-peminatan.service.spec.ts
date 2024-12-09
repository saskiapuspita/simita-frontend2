import { TestBed } from '@angular/core/testing';

import { RekapitulasiPeminatanService } from './rekapitulasi-peminatan.service';

describe('RekapitulasiPeminatanService', () => {
  let service: RekapitulasiPeminatanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RekapitulasiPeminatanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
