import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAbonoComponent } from './crear-abono.component';

describe('CrearAbonoComponent', () => {
  let component: CrearAbonoComponent;
  let fixture: ComponentFixture<CrearAbonoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearAbonoComponent]
    });
    fixture = TestBed.createComponent(CrearAbonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
