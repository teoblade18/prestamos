import { Component } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PrestamoI } from '../Models/PrestamoI';
import { ResponseI } from '../Models/Response.interface';
import { AbonoI } from '../Models/AbonoI';
import { InteresI } from '../Models/InteresI';
import { timeController } from '../util/timeController';
import { ClienteI } from '../Models/ClienteI';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-consultar-prestamos',
  templateUrl: './consultar-prestamos.component.html',
  styleUrls: ['../app.component.css','./consultar-prestamos.component.css']
})
export class ConsultarPrestamosComponent {
  constructor (private api: ApiService, private router: Router, private route: ActivatedRoute){

  }

  oPrestamistaString: string | null = localStorage.getItem('oPrestamista');

  prestamosCopia: PrestamoI[] = [];
  prestamos: PrestamoI[] = [];
  clientes : ClienteI[] = [];

  clienteSeleccionado: number = 0;

  errorStatus: boolean = false;
  errorMsj: string = "";

  idPrestamoDesplegado: number = 0;
  prestamoDesplegado: any;

  oTime = new timeController();
  fechaHoy : string = this.oTime.obtenerFechaHoy();

  ngOnInit() : void{
    console.log(this.clienteSeleccionado);

    if (this.oPrestamistaString == null){
      this.cerrarSesion();
    }
    else{
      let idPrestamista : any = JSON.parse(this.oPrestamistaString);

      this.api.consultarPrestamosXPrestamista(idPrestamista).subscribe(
        (data)=>{
          let dataResponse: ResponseI = data
          if (dataResponse.mensaje == 'ok') {
            let prestamosString = JSON.stringify(dataResponse.response)
            this.prestamos = JSON.parse(prestamosString);
            this.prestamosCopia = this.prestamos; //guarda una copia para los filtros

            //Revisa si la URL trae un id deCliente y filtra los préstamos a partir del mismo
            let idClienteFiltrado = this.route?.snapshot?.params['id'];

            if(idClienteFiltrado != null){
              this.clienteSeleccionado = idClienteFiltrado;
              this.filtrarXCliente({ target: { value: idClienteFiltrado } });
            }
          }
          else{
            this.errorStatus = true;
            this.errorMsj =  "No se encontraron prestamos para este prestamista.";
          }
        }
      );

      this.api.consultarClientes(idPrestamista).subscribe(
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
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  filtrarXCliente(event : any){

    if(event.target.value == 0){
      this.prestamos = this.prestamosCopia;
    }else{
      this.prestamos = this.prestamosCopia.filter(p => p.idCliente == event.target.value);
    }

  }

  prestamoEnEdicion : number = 0;

  cancelarPrestamo(prestamo : PrestamoI){
    if(confirm(`¿Estás seguro de cancelar el prestamo ${prestamo.idPrestamo}: ${prestamo.oCliente.nombre}`)){
      this.api.cancelarPrestamo(prestamo).subscribe(
        (data)=>{
          let dataResponse: ResponseI = data
          if (dataResponse.mensaje == 'ok') {
            this.recalcularPrestamos();
          }
          else{
            this.errorStatus = true;
            this.errorMsj =  "No se encontraron intereses con este id.";
          }
        }
      )
    }
  }

  mostrarInfoExtra(idPrestamo : number){

    if(idPrestamo != this.idPrestamoDesplegado){
      this.idPrestamoDesplegado = idPrestamo;
      this.prestamoDesplegado = this.prestamos.find(prestamo => prestamo.idPrestamo === this.idPrestamoDesplegado);
    }
    else{
      this.idPrestamoDesplegado = 0;
      this.prestamoDesplegado = {}
    }
  }

  modalAbonoAbierto : boolean = false;
  modalInteresAbierto : boolean = false;

  abrirModalAbono(){
    this.modalAbonoAbierto = true;
  }

  abrirModalInteres(){
    this.modalInteresAbierto = true;
  }

  cerrarModalAbono(abono : AbonoI){
    this.modalAbonoAbierto = false;

    if(abono != null){
      this.recalcularPrestamos();
    }
  }

  cerrarModalInteres(interes : InteresI){
    this.modalInteresAbierto = false;

    if(interes != null){
      this.recalcularPrestamos();
    }
  }

  eliminarAbono(idAbono: number){

    if(confirm('¿Estás seguro de eliminar este abono?')){
      this.api.eliminarAbono(idAbono).subscribe(
        (data)=>{
          let dataResponse: ResponseI = data
          if (dataResponse.mensaje == 'ok') {
            this.recalcularPrestamos();
          }
          else{
            this.errorStatus = true;
            this.errorMsj =  "No se encontraron abonos con este id.";
          }
        }
      );
    }
  }

  eliminarInteres(idInteres: number){

    if(confirm('¿Estás seguro de eliminar este interés?')){
      this.api.eliminarInteres(idInteres).subscribe(
        (data)=>{
          let dataResponse: ResponseI = data
          if (dataResponse.mensaje == 'ok') {
            this.recalcularPrestamos();
          }
          else{
            this.errorStatus = true;
            this.errorMsj =  "No se encontraron intereses con este id.";
          }
        }
      );
    }
  }

  recalcularPrestamos(){
    if (this.oPrestamistaString == null){
      this.cerrarSesion();
    }
    else{
      let idPrestamista : any = JSON.parse(this.oPrestamistaString);

      this.api.consultarPrestamosXPrestamista(idPrestamista).subscribe(
        (data)=>{
          let dataResponse: ResponseI = data
          if (dataResponse.mensaje == 'ok') {
            let prestamosString = JSON.stringify(dataResponse.response)
            this.prestamos = JSON.parse(prestamosString);
            this.prestamosCopia = this.prestamos;
          }
          else{
            this.errorStatus = true;
            this.errorMsj =  "No se encontraron prestamos para este prestamista.";
          }
        }
      );
    }
  }
}
