import { TestBed } from '@angular/core/testing';

import { MasterMataKuliahService } from './master-mata-kuliah.service';

describe('MasterMataKuliahService', () => {
  let service: MasterMataKuliahService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterMataKuliahService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
