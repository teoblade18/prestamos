import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPrestamistaComponent } from './registrar-prestamista.component';

describe('RegistrarPrestamistaComponent', () => {
  let component: RegistrarPrestamistaComponent;
  let fixture: ComponentFixture<RegistrarPrestamistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarPrestamistaComponent]
    });
    fixture = TestBed.createComponent(RegistrarPrestamistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
