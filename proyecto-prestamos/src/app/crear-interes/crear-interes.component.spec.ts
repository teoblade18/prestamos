import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearInteresComponent } from './crear-interes.component';

describe('CrearInteresComponent', () => {
  let component: CrearInteresComponent;
  let fixture: ComponentFixture<CrearInteresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearInteresComponent]
    });
    fixture = TestBed.createComponent(CrearInteresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
