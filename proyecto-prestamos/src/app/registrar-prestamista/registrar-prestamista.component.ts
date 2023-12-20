import { Component } from '@angular/core';
import { NgModel, Validators } from '@angular/forms';
import { Prestamista } from '../../Class/Prestamista';
import { FormControl} from '@angular/forms';
import { min } from 'rxjs';

@Component({
  selector: 'app-registrar-prestamista',
  templateUrl: './registrar-prestamista.component.html',
  styleUrls: ['../app.component.css', './registrar-prestamista.component.css'],
})
export class RegistrarPrestamistaComponent {

  nombreUsuarioFC = new FormControl('',Validators.required);
  contraseniaFC = new FormControl('', [Validators.required, Validators.minLength(6)]);
  nombreFC = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)])
  capitalFC = new FormControl('', [Validators.required, Validators.min(0)]);
  numeroCuentaFC = new FormControl ('', [Validators.required, Validators.pattern(/^\d+$/)])

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
