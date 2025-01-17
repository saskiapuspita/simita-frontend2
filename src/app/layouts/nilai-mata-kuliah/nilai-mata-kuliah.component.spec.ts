import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NilaiMataKuliahComponent } from './nilai-mata-kuliah.component';

describe('NilaiMataKuliahComponent', () => {
  let component: NilaiMataKuliahComponent;
  let fixture: ComponentFixture<NilaiMataKuliahComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NilaiMataKuliahComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NilaiMataKuliahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
