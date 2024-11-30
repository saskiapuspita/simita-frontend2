import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PengajuanPklComponent } from './pengajuan-pkl.component';

describe('PengajuanPklComponent', () => {
  let component: PengajuanPklComponent;
  let fixture: ComponentFixture<PengajuanPklComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PengajuanPklComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PengajuanPklComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
