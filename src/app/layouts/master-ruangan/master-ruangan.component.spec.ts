import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterRuanganComponent } from './master-ruangan.component';

describe('MasterRuanganComponent', () => {
  let component: MasterRuanganComponent;
  let fixture: ComponentFixture<MasterRuanganComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterRuanganComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterRuanganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
