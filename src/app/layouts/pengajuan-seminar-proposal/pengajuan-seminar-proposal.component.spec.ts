import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PengajuanSeminarProposalComponent } from './pengajuan-seminar-proposal.component';

describe('PengajuanSeminarProposalComponent', () => {
  let component: PengajuanSeminarProposalComponent;
  let fixture: ComponentFixture<PengajuanSeminarProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PengajuanSeminarProposalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PengajuanSeminarProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
