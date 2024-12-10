import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PengajuanJudulPenelitianComponent } from './pengajuan-judul-penelitian.component';

describe('PengajuanJudulPenelitianComponent', () => {
  let component: PengajuanJudulPenelitianComponent;
  let fixture: ComponentFixture<PengajuanJudulPenelitianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PengajuanJudulPenelitianComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PengajuanJudulPenelitianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
