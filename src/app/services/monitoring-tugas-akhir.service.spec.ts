import { TestBed } from '@angular/core/testing';

import { MonitoringTugasAkhirService } from './monitoring-tugas-akhir.service';

describe('MonitoringTugasAkhirService', () => {
  let service: MonitoringTugasAkhirService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonitoringTugasAkhirService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
