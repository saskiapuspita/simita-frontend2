import { TestBed } from '@angular/core/testing';

import { MasterLokasiSkripsiService } from './master-lokasi-skripsi.service';

describe('MasterLokasiSkripsiService', () => {
  let service: MasterLokasiSkripsiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterLokasiSkripsiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
