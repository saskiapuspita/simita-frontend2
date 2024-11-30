import { TestBed } from '@angular/core/testing';

import { MasterMahasiswaService } from './master-mahasiswa.service';

describe('MasterMahasiswaService', () => {
  let service: MasterMahasiswaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterMahasiswaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
