import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterMataKuliahComponent } from './master-mata-kuliah.component';

describe('MasterMataKuliahComponent', () => {
  let component: MasterMataKuliahComponent;
  let fixture: ComponentFixture<MasterMataKuliahComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterMataKuliahComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterMataKuliahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
