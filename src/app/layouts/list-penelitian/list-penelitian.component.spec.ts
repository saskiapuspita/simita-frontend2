import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPenelitianComponent } from './list-penelitian.component';

describe('ListPenelitianComponent', () => {
  let component: ListPenelitianComponent;
  let fixture: ComponentFixture<ListPenelitianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPenelitianComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPenelitianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
