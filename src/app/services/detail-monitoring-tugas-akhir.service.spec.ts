import { TestBed } from '@angular/core/testing';

import { DetailMonitoringTugasAkhirService } from './detail-monitoring-tugas-akhir.service';

describe('DetailMonitoringTugasAkhirService', () => {
  let service: DetailMonitoringTugasAkhirService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailMonitoringTugasAkhirService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
