import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Prestamista } from '../../Class/Prestamista';

@Component({
  selector: 'app-registrar-prestamista',
  templateUrl: './registrar-prestamista.component.html',
  styleUrls: ['../app.component.css', './registrar-prestamista.component.css'],
})
export class RegistrarPrestamistaComponent {
  prestamista: Prestamista = {
    nombre: '',
    capital: 0,
    numeroCuenta: '',
    usuario: {
      nombreUsuario: '',
      contrasenia: '',
    },
  };

  validarFormulario() {
    console.log(this.prestamista);
  }
}
