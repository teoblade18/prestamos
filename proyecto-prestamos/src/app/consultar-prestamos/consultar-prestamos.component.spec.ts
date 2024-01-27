import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarPrestamosComponent } from './consultar-prestamos.component';

describe('ConsultarPrestamosComponent', () => {
  let component: ConsultarPrestamosComponent;
  let fixture: ComponentFixture<ConsultarPrestamosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultarPrestamosComponent]
    });
    fixture = TestBed.createComponent(ConsultarPrestamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
