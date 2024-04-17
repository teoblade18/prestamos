import { Component, Input } from '@angular/core';
import { FormBuilder, Validators, FormControl} from '@angular/forms';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';
import { ResponseI } from '../Models/Response.interface';
import { ClienteI } from '../Models/ClienteI';
import { timeController } from '../util/timeController';

@Component({
  selector: 'app-crear-prestamo',
  templateUrl: './crear-prestamo.component.html',
  styleUrls: ['../app.component.css','./crear-prestamo.component.css']
})
export class CrearPrestamoComponent {

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {}

  //#region variables
  get cliente(){
    return this.formPrestamo.get('cliente') as FormControl;
  }

  get fechaInicial() {
    return this.formPrestamo.get('fechaInicial') as FormControl;
  }

  get montoInicial() {
    return this.formPrestamo.get('montoInicial') as FormControl;
  }

  get tipoIntereses() {
    return this.formPrestamo.get('tipoIntereses') as FormControl;
  }

  get porcentajeInteres() {
    return this.formPrestamo.get('porcentajeInteres') as FormControl;
  }

  get diaCorte() {
    return this.formPrestamo.get('diaCorte') as FormControl;
  }

  get fechaPago() {
    return this.formPrestamo.get('fechaPago') as FormControl;
  }

  get fechaPrimerPago() {
    return this.formPrestamo.get('fechaPrimerPago') as FormControl;
  }
  //#endregion

  oTime = new timeController();
  fechaHoy : string = this.oTime.obtenerFechaHoy();

  formPrestamo = this.fb.group({
    cliente: [0, [Validators.required, Validators.min(1)]],
    fechaInicial: [this.fechaHoy , [Validators.required]],
    montoInicial: ['', [Validators.required, Validators.min(1)]],
    tipoIntereses: ['Compuesto', [Validators.required,  Validators.min(1)]],
    porcentajeInteres: [5, [Validators.required,  Validators.min(1)]],
    diaCorte: [0, [Validators.required,  Validators.min(1)]],
    fechaPago: ['', [Validators.required]],
    fechaPrimerPago: ['', [Validators.required]]
  });

  @Input() dataEntrante : any;
  prestamo : any = {}

  clientes : ClienteI[] = [];
  tiposInteres : string[] = ['Compuesto', 'Fijo']
  diasCorte : any[] = [{id: 1, nombre:'Primero'},{id:2, nombre:'Quincena'}]

  errorStatus: boolean = false;
  errorMsj: string = '';

  oPrestamistaString: string | null = sessionStorage.getItem('oPrestamista');
  idPrestamista: any;
  numeroPrestamosXCliente: number = 0;

  ngOnInit(): void {
    if (this.oPrestamistaString == null){
      this.cerrarSesion();
    }
    else{
      this.idPrestamista = JSON.parse(this.oPrestamistaString) as any;

      this.api.consultarClientes(this.idPrestamista).subscribe(
        (data) => {
          let dataResponse: ResponseI = data;
          if (dataResponse.mensaje == 'ok') {
            let clientesString = JSON.stringify(dataResponse.response)
            this.clientes = JSON.parse(clientesString);
          }else{
            this.errorStatus = true;
            this.errorMsj =  "No se encontraron clientes para este prestamista.";
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
    sessionStorage.clear();
    this.router.navigate(['/home']);
  }

  registrarPrestamo(){

    this.prestamo = {
      idPrestamo: 0,
      idCliente : this.cliente.value,
      idPrestamista : this.idPrestamista,
      fechaInicial: this.fechaInicial.value,
      porcentaje: this.porcentajeInteres.value,
      tipoIntereses: this.tipoIntereses.value,
      diaCorte : this.diaCorte.value,
      montoInicial : this.montoInicial.value,
      montoReal: this.montoInicial.value,
      fechaPago: this.fechaPago.value,
      fechaProximoPago: this.fechaPrimerPago.value
    }

    //Consulta si el prestamista tiene más prestamos a nombre del mismo cliente
    this.api.ConsultarNumeroPrestamosXCliente(this.prestamo.idCliente).subscribe(
      (data) => {
        let dataResponse: ResponseI = data;
        if (dataResponse.mensaje == 'ok') {
          this.numeroPrestamosXCliente = parseInt(dataResponse.response);
          let respuestaVariosPrestamos : boolean = true;

          if(this.numeroPrestamosXCliente > 0){
            respuestaVariosPrestamos = confirm("Este cliente tiene ya un préstamo registrado ¿Desea continuar?");
          }

          if(respuestaVariosPrestamos){
            //Consulta el capital del prestamista, para ver si tiene dinero suficiente para prestar
            this.api.consultarCapitalPrestamista(this.idPrestamista).subscribe(
              (data) => {
                let dataResponse: ResponseI = data;
                if (dataResponse.mensaje == 'ok') {
                  let capitalActual: number = dataResponse.response as any

                  if(capitalActual >= this.montoInicial.value){
                    this.api.registrarPrestamo(this.prestamo).subscribe(
                      (data) => {
                        let dataResponse: ResponseI = data;
                        if (dataResponse.mensaje == 'ok') {
                          this.router.navigate(['/consultar-prestamos']);
                        }
                      },

                      (error) => {
                        this.errorStatus = true;
                        this.errorMsj =  error.mensaje;
                      }
                    );
                  }
                  else{
                    this.errorStatus = true;
                    this.errorMsj = "No tiene capital suficiente para crear el préstamo";
                  }
                }
              },
              (error) => {
                this.errorStatus = true;
                this.errorMsj =  error.mensaje;
              }
            );
          }
        }
      },

      (error) => {
        this.errorStatus = true;
        this.errorMsj =  error.mensaje;
      }
    );
  }

}
