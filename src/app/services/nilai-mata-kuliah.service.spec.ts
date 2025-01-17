import { TestBed } from '@angular/core/testing';

import { NilaiMataKuliahService } from './nilai-mata-kuliah.service';

describe('NilaiMataKuliahService', () => {
  let service: NilaiMataKuliahService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NilaiMataKuliahService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
