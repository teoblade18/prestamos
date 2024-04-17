import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialPrestamosComponent } from './historial-prestamos.component';

describe('HistorialPrestamosComponent', () => {
  let component: HistorialPrestamosComponent;
  let fixture: ComponentFixture<HistorialPrestamosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistorialPrestamosComponent]
    });
    fixture = TestBed.createComponent(HistorialPrestamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
