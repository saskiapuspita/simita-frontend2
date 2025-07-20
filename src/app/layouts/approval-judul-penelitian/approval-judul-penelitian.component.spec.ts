import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalJudulPenelitianComponent } from './approval-judul-penelitian.component';

describe('ApprovalJudulPenelitianComponent', () => {
  let component: ApprovalJudulPenelitianComponent;
  let fixture: ComponentFixture<ApprovalJudulPenelitianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalJudulPenelitianComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovalJudulPenelitianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
