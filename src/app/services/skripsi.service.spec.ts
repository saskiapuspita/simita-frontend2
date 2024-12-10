import { TestBed } from '@angular/core/testing';

import { SkripsiService } from './skripsi.service';

describe('SkripsiService', () => {
  let service: SkripsiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkripsiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
