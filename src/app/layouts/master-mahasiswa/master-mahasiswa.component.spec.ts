import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterMahasiswaComponent } from './master-mahasiswa.component';

describe('MasterMahasiswaComponent', () => {
  let component: MasterMahasiswaComponent;
  let fixture: ComponentFixture<MasterMahasiswaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterMahasiswaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterMahasiswaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
