import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusJudulPenetianComponent } from './status-judul-penetian.component';

describe('StatusJudulPenetianComponent', () => {
  let component: StatusJudulPenetianComponent;
  let fixture: ComponentFixture<StatusJudulPenetianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusJudulPenetianComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusJudulPenetianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
