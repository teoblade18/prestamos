import { Component } from '@angular/core';
import { FormGroup, FormControl, NgModel , Validators} from '@angular/forms';
import { Prestamista } from '../../Class/Prestamista';

@Component({
  selector: 'app-registrar-prestamista',
  templateUrl: './registrar-prestamista.component.html',
  styleUrls: ['../app.component.css', './registrar-prestamista.component.css'],
})
export class RegistrarPrestamistaComponent {

  //#region getters
  get nombreUsuario(){
    return this.formPrestamista.get('nombreUsuario') as FormControl;
  }

  get contrasenia(){
    return this.formPrestamista.get('contrasenia') as FormControl;
  }

  get nombre(){
    return this.formPrestamista.get('nombre') as FormControl;
  }

  get capital(){
    return this.formPrestamista.get('capital') as FormControl;
  }

  get numeroCuenta(){
    return this.formPrestamista.get('numeroCuenta') as FormControl;
  }
  //#endregion

  formPrestamista = new FormGroup({
    'nombreUsuario' : new FormControl('',Validators.required),
    'contrasenia' : new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/)]),
    'nombre' : new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)]),
    'capital' : new FormControl('', [Validators.required, Validators.min(0)]),
    'numeroCuenta' : new FormControl ('', [Validators.required, Validators.pattern(/^\d+$/)])
  });

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
    this.prestamista = {
      nombre: this.nombreUsuario.value,
      capital: this.capital.value,
      numeroCuenta: this.numeroCuenta.value,
      usuario: {
        nombreUsuario: this.nombreUsuario.value,
        contrasenia: this.contrasenia.value,
      },
    };

    console.log(this.prestamista);
  }
}
