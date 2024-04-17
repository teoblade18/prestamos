import { Component, Input, EventEmitter, Output} from '@angular/core';
import {FormBuilder,FormControl,Validators} from '@angular/forms';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';
import { ClienteI } from '../Models/ClienteI';
import { PrestamistaI } from '../Models/PrestamistaI';
import { ResponseI } from '../Models/Response.interface';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['../app.component.css','./crear-cliente.component.css']
})
export class CrearClienteComponent {

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {}

  @Input() dataEntrante: any;

  oPrestamistaString: string | null = sessionStorage.getItem('oPrestamista');
  idPrestamista: any = this.oPrestamistaString ? JSON.parse(this.oPrestamistaString) : {};

  cliente : ClienteI = {
    idCliente : 0,
    nombre : '',
    cedula : '',
    numeroCuenta : '',
    puntaje: 0,
    maxPrestar: 0,
    idPrestamista: 0
  }

  errorStatus: boolean = false;
  errorMsj: string = '';

  ngOnInit(): void {
    if (this.oPrestamistaString == null){
      this.cerrarSesion();
    }
    else{
      if(this.dataEntrante){
        let clienteEntrante : ClienteI = this.dataEntrante as ClienteI;


        this.nombre.setValue(clienteEntrante.nombre);
        this.cedula.setValue(clienteEntrante.cedula);
        this.numeroCuenta.setValue(clienteEntrante.numeroCuenta);
      }
    }
  }

  cerrarSesion(){
    sessionStorage.clear();
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
      puntaje: 0,
      maxPrestar: 0,
      idPrestamista : this.idPrestamista
    }

    this.api.registrarCliente(this.cliente).subscribe(
      (data) => {
        let dataResponse: ResponseI = data;
        if (dataResponse.mensaje == 'ok') {
          this.router.navigate(['/consultar-clientes']);
        }
      },

      (error) => {
        this.errorStatus = true;
        this.errorMsj =  error.mensaje;
      }
    );
  }

  @Output() edicionFinalizada = new EventEmitter<ClienteI>();

  editarCliente(){
    let clienteEditado : ClienteI = {
      idCliente : this.dataEntrante.idCliente,
      nombre : this.nombre.value,
      cedula : this.cedula.value,
      numeroCuenta : this.numeroCuenta.value,
      puntaje: this.dataEntrante.puntaje,
      maxPrestar: this.dataEntrante.maxPrestar,
      idPrestamista : this.dataEntrante.idPrestamista
    }

    this.api.editarCliente(clienteEditado).subscribe(
      (data) => {
        let dataResponse: ResponseI = data;
        if (dataResponse.mensaje == 'ok') {
          let jsonResponse = JSON.stringify(dataResponse.response); // Convertir a JSON
          this.edicionFinalizada.emit(clienteEditado);
        }
      },

      (error) => {
        this.errorStatus = true;
        this.errorMsj =  error.mensaje;
      }
    );

  }

}
