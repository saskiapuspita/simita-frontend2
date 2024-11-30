import { TestBed } from '@angular/core/testing';

import { PengajuanPklService } from './pengajuan-pkl.service';

describe('PengajuanPklService', () => {
  let service: PengajuanPklService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PengajuanPklService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
