import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringTugasAkhirComponent } from './monitoring-tugas-akhir.component';

describe('MonitoringTugasAkhirComponent', () => {
  let component: MonitoringTugasAkhirComponent;
  let fixture: ComponentFixture<MonitoringTugasAkhirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoringTugasAkhirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitoringTugasAkhirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
