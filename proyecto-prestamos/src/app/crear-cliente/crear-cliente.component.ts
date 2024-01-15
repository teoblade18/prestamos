import { Component } from '@angular/core';
import {FormBuilder,FormControl,Validators} from '@angular/forms';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';
import { ClienteI } from '../Models/ClienteI';
import { PrestamistaI } from '../Models/PrestamistaI';
import { ResponseI } from '../Models/Response.interface';
import { SesionController } from '../util/sesionController';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['../app.component.css','./crear-cliente.component.css']
})
export class CrearClienteComponent {

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {}

  oPrestamistaString: string | null = localStorage.getItem('oPrestamista');
  oPrestamistaObject: PrestamistaI = this.oPrestamistaString ? JSON.parse(this.oPrestamistaString) : {};

  cliente : ClienteI = {
    idCliente : 0,
    nombre : '',
    cedula : '',
    numeroCuenta : '',
    idPrestamista: 0
  }

  errorStatus: boolean = false;
  errorMsj: string = '';

  ngOnInit(): void {
    if (this.oPrestamistaString == null){
      this.cerrarSesion();
    }
  }

  cerrarSesion(){
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  //#region getters
  get nombre() {
    return this.formCliente.get('nombre') as FormControl;
  }

  get cedula() {
    return this.formCliente.get('cedula') as FormControl;
  }

  get numeroCuenta() {
    return this.formCliente.get('numeroCuenta') as FormControl;
  }
  //#endregion

  formCliente = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)]],
    cedula: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    numeroCuenta: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
  });

  registrarCliente(){
    this.cliente = {
      idCliente : 0,
      nombre : this.nombre.value,
      cedula : this.cedula.value,
      numeroCuenta : this.numeroCuenta.value,
      idPrestamista : this.oPrestamistaObject.idPrestamista
    }

    console.log(this.cliente);

    this.api.registrarCliente(this.cliente).subscribe(
      (data) => {
        let dataResponse: ResponseI = data;
        console.log(dataResponse);
        if (dataResponse.mensaje == 'Cliente registrado') {
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

}
