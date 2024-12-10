import { TestBed } from '@angular/core/testing';

import { SeminarProposalService } from './seminar-proposal.service';

describe('SeminarProposalService', () => {
  let service: SeminarProposalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeminarProposalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
