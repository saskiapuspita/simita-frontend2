import { TestBed } from '@angular/core/testing';

import { MasterPeminatanService } from './master-peminatan.service';

describe('MasterPeminatanService', () => {
  let service: MasterPeminatanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterPeminatanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
