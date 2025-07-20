import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PengajuanSeminarHasilComponent } from './pengajuan-seminar-hasil.component';

describe('PengajuanSeminarHasilComponent', () => {
  let component: PengajuanSeminarHasilComponent;
  let fixture: ComponentFixture<PengajuanSeminarHasilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PengajuanSeminarHasilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PengajuanSeminarHasilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
