import { Component } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';
import { HistorialPrestamoI } from '../Models/HistorialPrestamo';
import { ResponseI } from '../Models/Response.interface';
import { ClienteI } from '../Models/ClienteI';

@Component({
  selector: 'app-historial-prestamos',
  templateUrl: './historial-prestamos.component.html',
  styleUrls: ['../app.component.css','./historial-prestamos.component.css']
})
export class HistorialPrestamosComponent {

  constructor(private api: ApiService, private router: Router){}

  oPrestamistaString: string | null = sessionStorage.getItem('oPrestamista');
  idPrestamista: any;

  errorStatus: boolean = false;
  errorMsj: string = '';

  historialPrestamos : HistorialPrestamoI[] = [];
  historialPrestamosCopia : HistorialPrestamoI[] = [];
  clientes : ClienteI[] = [];

  sumaMontoInicial : number = 0;
  sumaTotalAbonos: number = 0;
  sumaTotalIntereses: number = 0;
  sumaTotalDeudaActual: number = 0;

  ngOnInit(): void {
    if (this.oPrestamistaString == null){
      this.cerrarSesion();
    }
    else{
      this.idPrestamista = JSON.parse(this.oPrestamistaString) as any;

      this.api.consultarHistorialPrestamos(this.idPrestamista).subscribe(
        (data) => {
          let dataResponse: ResponseI = data;
          if (dataResponse.mensaje == 'ok') {
            let historialString = JSON.stringify(dataResponse.response)
            this.historialPrestamos = JSON.parse(historialString);
            this.historialPrestamosCopia = this.historialPrestamos;

            for (let i = 0; i < this.historialPrestamos.length; i++) {
              this.sumaMontoInicial += this.historialPrestamos[i].montoInicial;
              this.sumaTotalAbonos += this.historialPrestamos[i].totalAbonos;
              this.sumaTotalIntereses += this.historialPrestamos[i].totalIntereses;
              this.sumaTotalDeudaActual += this.historialPrestamos[i].deudaActual;
            }

          }else{
            this.errorStatus = true;
            this.errorMsj =  "No se encontró historial de préstamos.";
          }
        },

        (error) => {
          this.errorStatus = true;
          this.errorMsj =  error.mensaje;
        }
      );

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

  recalcularHistorial(){
    this.idPrestamista = JSON.parse(this.oPrestamistaString ? this.oPrestamistaString : '0') as any;

      this.api.consultarHistorialPrestamos(this.idPrestamista).subscribe(
        (data) => {
          let dataResponse: ResponseI = data;
          if (dataResponse.mensaje == 'ok') {
            let historialString = JSON.stringify(dataResponse.response)
            this.historialPrestamos = JSON.parse(historialString);
            this.historialPrestamosCopia = this.historialPrestamos;

            this.calcularSumas();

          }else{
            this.errorStatus = true;
            this.errorMsj =  "No se encontró historial de préstamos.";
          }
        },

        (error) => {
          this.errorStatus = true;
          this.errorMsj =  error.mensaje;
        }
      );
  }

  columnaActual: number = 0;

  ordenar(columna : number) {
    if(this.columnaActual == columna){
      columna *= -1;
    }
    else if (this.columnaActual == (columna * -1)){
      columna = 0;
    }

    console.log(columna);

    switch (columna){
      case -1: this.historialPrestamos.sort((a, b) => b.oCliente.nombre.localeCompare(a.oCliente.nombre))
      break;
      case -2: this.historialPrestamos.sort((a, b) => b.estado.localeCompare(a.estado))
      break;
      case -3: this.historialPrestamos.sort((a, b) => b.montoInicial - a.montoInicial);
      break;
      case -4: this.historialPrestamos.sort((a, b) => b.totalAbonos - a.totalAbonos);
      break;
      case -5: this.historialPrestamos.sort((a, b) => b.totalIntereses - a.totalIntereses);
      break;
      case -6: this.historialPrestamos.sort((a, b) => b.porcentaje - a.porcentaje);
      break;
      case -7: this.historialPrestamos.sort((a, b) => b.fechaInicial.localeCompare(a.fechaInicial))
      break;
      case -8: this.historialPrestamos.sort((a, b) => b.fechaInicial.localeCompare(a.fechaInicial))
      break;
      case -9: this.historialPrestamos.sort((a, b) => b.fechaPago.localeCompare(a.fechaPago))
      break;
      case -10: this.historialPrestamos.sort((a, b) => b.deudaActual - a.deudaActual);
      break;
      case 0: this.recalcularHistorial();
      break;
      case 1: this.historialPrestamos.sort((a, b) => a.oCliente.nombre.localeCompare(b.oCliente.nombre))
      break;
      case 2: this.historialPrestamos.sort((a, b) => a.estado.localeCompare(b.estado))
      break;
      case 3: this.historialPrestamos.sort((a, b) => a.montoInicial - b.montoInicial);
      break;
      case 4: this.historialPrestamos.sort((a, b) => a.totalAbonos - b.totalAbonos);
      break;
      case 5: this.historialPrestamos.sort((a, b) => a.totalIntereses - b.totalIntereses);
      break;
      case 6: this.historialPrestamos.sort((a, b) => a.porcentaje - b.porcentaje);
      break;
      case 7: this.historialPrestamos.sort((a, b) => a.fechaInicial.localeCompare(b.fechaInicial))
      break;
      case 8: this.historialPrestamos.sort((a, b) => a.fechaInicial.localeCompare(b.fechaInicial))
      break;
      case 9: this.historialPrestamos.sort((a, b) => a.fechaPago.localeCompare(b.fechaPago))
      break;
      case 10: this.historialPrestamos.sort((a, b) => a.deudaActual - b.deudaActual);
      break;
    }

    this.columnaActual = columna;
  }

  clienteSeleccionado: number = 0;

  filtrarXCliente(event : any){
    this.historialPrestamos = this.historialPrestamosCopia;

    if(event.target.value == '0'){
      this.recalcularHistorial();
      this.estadoSeleccionado = '0';
    }else{
      this.historialPrestamos = this.historialPrestamosCopia.filter(p => p.idCliente == event.target.value);

      if(this.estadoSeleccionado != '0'){
        this.historialPrestamos = this.historialPrestamos.filter(p => p.estado == this.estadoSeleccionado);
      }

      this.calcularSumas();
    }
  }

  estadoSeleccionado : string = '0';

  filtrarXEstado(event : any){
    if(event.target.value == '0'){
      this.recalcularHistorial();
      this.clienteSeleccionado = 0;
    }else{
      this.historialPrestamos = this.historialPrestamosCopia.filter(p => p.estado == event.target.value);

      if(this.clienteSeleccionado != 0){
        this.historialPrestamos = this.historialPrestamos.filter(p => p.idCliente == this.clienteSeleccionado);
      }

      this.calcularSumas();
    }
  }

  calcularSumas(){
    this.sumaMontoInicial = 0;
    this.sumaTotalAbonos = 0;
    this.sumaTotalIntereses = 0;
    this.sumaTotalDeudaActual = 0;

    for (let i = 0; i < this.historialPrestamos.length; i++) {
      this.sumaMontoInicial += this.historialPrestamos[i].montoInicial;
      this.sumaTotalAbonos += this.historialPrestamos[i].totalAbonos;
      this.sumaTotalIntereses += this.historialPrestamos[i].totalIntereses;
      this.sumaTotalDeudaActual += this.historialPrestamos[i].deudaActual;
    }
  }

  cerrarSesion(){
    sessionStorage.clear();
    this.router.navigate(['/home']);
  }
}
