import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PengajuanPeminatanComponent } from './pengajuan-peminatan.component';

describe('PengajuanPeminatanComponent', () => {
  let component: PengajuanPeminatanComponent;
  let fixture: ComponentFixture<PengajuanPeminatanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PengajuanPeminatanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PengajuanPeminatanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
