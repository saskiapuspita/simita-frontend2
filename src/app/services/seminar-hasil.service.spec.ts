import { TestBed } from '@angular/core/testing';

import { SeminarHasilService } from './seminar-hasil.service';

describe('SeminarHasilService', () => {
  let service: SeminarHasilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeminarHasilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
