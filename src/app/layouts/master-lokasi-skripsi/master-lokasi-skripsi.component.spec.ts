import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterLokasiSkripsiComponent } from './master-lokasi-skripsi.component';

describe('MasterLokasiSkripsiComponent', () => {
  let component: MasterLokasiSkripsiComponent;
  let fixture: ComponentFixture<MasterLokasiSkripsiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterLokasiSkripsiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterLokasiSkripsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
