import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendaftaranPeminatanComponent } from './pendaftaran-peminatan.component';

describe('PendaftaranPeminatanComponent', () => {
  let component: PendaftaranPeminatanComponent;
  let fixture: ComponentFixture<PendaftaranPeminatanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendaftaranPeminatanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendaftaranPeminatanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
