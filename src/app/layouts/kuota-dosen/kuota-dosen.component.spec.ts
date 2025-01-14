import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KuotaDosenComponent } from './kuota-dosen.component';

describe('KuotaDosenComponent', () => {
  let component: KuotaDosenComponent;
  let fixture: ComponentFixture<KuotaDosenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KuotaDosenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KuotaDosenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
