import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RekapitulasiPeminatanComponent } from './rekapitulasi-peminatan.component';

describe('RekapitulasiPeminatanComponent', () => {
  let component: RekapitulasiPeminatanComponent;
  let fixture: ComponentFixture<RekapitulasiPeminatanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RekapitulasiPeminatanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RekapitulasiPeminatanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
