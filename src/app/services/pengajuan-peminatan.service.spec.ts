import { TestBed } from '@angular/core/testing';

import { PengajuanPeminatanService } from './pengajuan-peminatan.service';

describe('PengajuanPeminatanService', () => {
  let service: PengajuanPeminatanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PengajuanPeminatanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
