import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDosenComponent } from './master-dosen.component';

describe('MasterDosenComponent', () => {
  let component: MasterDosenComponent;
  let fixture: ComponentFixture<MasterDosenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterDosenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterDosenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
