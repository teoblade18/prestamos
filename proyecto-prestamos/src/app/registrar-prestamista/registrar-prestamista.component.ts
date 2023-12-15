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
    nombre: 'Mateo Agudelo',
    capital: 50000,
    numeroCuenta: '007786',
    usuario: {
      nombreUsuario: 'Magudelo',
      contrasenia: '123456',
    },
  };

  validarFormulario() {
    console.log(this.prestamista);
  }
}
