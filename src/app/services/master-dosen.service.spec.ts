import { TestBed } from '@angular/core/testing';

import { MasterDosenService } from './master-dosen.service';

describe('MasterDosenService', () => {
  let service: MasterDosenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterDosenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
