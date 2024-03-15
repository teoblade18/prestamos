import { Component } from '@angular/core';
import {FormBuilder,FormControl,Validators} from '@angular/forms';
import { PrestamistaI } from '../Models/PrestamistaI';
import { ResponseI } from '../Models/Response.interface';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';
import { encrypt } from '../util/util-encrypt';

@Component({
  selector: 'app-registrar-prestamista',
  templateUrl: './registrar-prestamista.component.html',
  styleUrls: ['../app.component.css', './registrar-prestamista.component.css'],
})
export class RegistrarPrestamistaComponent {
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {}

  //#region getters
  get nombreUsuario() {
    return this.formPrestamista.get('nombreUsuario') as FormControl;
  }

  get contrasenia() {
    return this.formPrestamista.get('contrasenia') as FormControl;
  }

  get email() {
    return this.formPrestamista.get('email') as FormControl;
  }

  get nombre() {
    return this.formPrestamista.get('nombre') as FormControl;
  }

  get capital() {
    return this.formPrestamista.get('capital') as FormControl;
  }

  get numeroCuenta() {
    return this.formPrestamista.get('numeroCuenta') as FormControl;
  }
  //#endregion

  formPrestamista = this.fb.group({
    nombreUsuario: ['', Validators.required],
    contrasenia: ['',[ Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/)]],
    nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)]],
    capital: ['', [Validators.required, Validators.min(0)]],
    numeroCuenta: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    email: ['', [Validators.required, Validators.email]],
  });

  prestamista: PrestamistaI = {
    idPrestamista: 0,
    nombre: '',
    capital: 0,
    numeroCuenta: '',
    oUsuario: {
      nombreUsuario: '',
      contraseña: '',
      email: '',
    },
  };

  errorStatus: boolean = false;
  errorMsj: string = '';

  oPrestamistaString: string | null = localStorage.getItem('oPrestamista');
  idPrestamista: any = this.oPrestamistaString;

  prestamistaConsultado : any;

  ngOnInit() : void{
    if (this.oPrestamistaString != null){
      this.api.obtenerPrestamista(this.idPrestamista).subscribe(
        (data) => {
          let dataResponse: ResponseI = data;
          this.prestamistaConsultado = dataResponse.response as any;

          if (dataResponse.mensaje == 'ok') {
            this.nombre.setValue(this.prestamistaConsultado.nombre);
            this.capital.setValue(this.prestamistaConsultado.capital);
            this.numeroCuenta.setValue(this.prestamistaConsultado.numeroCuenta);
          }
        },

        (error) => {
          this.errorStatus = true;
          this.errorMsj =  error.mensaje;
        }
      );
    }
  }

  cerrarSesion(){
    localStorage.clear();
    this.router.navigate(['/home']);
  }


  registrarPrestamista() {
    this.prestamista = {
      idPrestamista: 0,
      nombre: this.nombre.value,
      capital: this.capital.value,
      numeroCuenta: this.numeroCuenta.value,
      oUsuario: {
        nombreUsuario: this.nombreUsuario.value,
        contraseña: this.contrasenia.value,
        email: this.email.value,
      },
    };

    this.api.registrarPrestamista(this.prestamista).subscribe(
      (data) => {
        let dataResponse: ResponseI = data;
        if (dataResponse.mensaje == 'Prestamista registrado') {
          let jsonResponse = JSON.stringify(dataResponse.response); // Convertir a JSON
          localStorage.setItem('oPrestamista', jsonResponse);
          this.router.navigate(['/menu']);
        }
      },

      (error) => {
        this.errorStatus = true;
        this.errorMsj =  error.mensaje;
      }
    );
  }

  editarPrestamista(){
    console.log(this.prestamistaConsultado)

    this.prestamista = this.prestamistaConsultado;
    this.prestamista.nombre = this.nombre.value;
    this.prestamista.numeroCuenta = this.numeroCuenta.value;
    this.prestamista.capital = this.capital.value;
    this.prestamista.oUsuario = {
      nombreUsuario : 'null',
      email: 'null',
      contraseña: 'null'
    }

    console.log(this.prestamista);

    this.api.editarPrestamista(this.prestamista).subscribe(
      (data) => {
        let dataResponse: ResponseI = data;
        if (dataResponse.mensaje == 'ok') {
          alert('Prestamista editado');
        }
      },

      (error) => {
        this.errorStatus = true;
        this.errorMsj =  error.mensaje;
      }
    );
  }

}
