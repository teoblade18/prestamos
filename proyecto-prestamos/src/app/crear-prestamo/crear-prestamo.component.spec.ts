import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPrestamoComponent } from './crear-prestamo.component';

describe('CrearPrestamoComponent', () => {
  let component: CrearPrestamoComponent;
  let fixture: ComponentFixture<CrearPrestamoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearPrestamoComponent]
    });
    fixture = TestBed.createComponent(CrearPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
