import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterPeminatanComponent } from './master-peminatan.component';

describe('MasterPeminatanComponent', () => {
  let component: MasterPeminatanComponent;
  let fixture: ComponentFixture<MasterPeminatanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterPeminatanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterPeminatanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
