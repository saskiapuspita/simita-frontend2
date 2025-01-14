import { TestBed } from '@angular/core/testing';

import { KuotaDosenService } from './kuota-dosen.service';

describe('KuotaDosenService', () => {
  let service: KuotaDosenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KuotaDosenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
