import { Component } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';
import { PrestamistaI } from '../Models/PrestamistaI';
import { PrestamoI } from '../Models/PrestamoI';
import { ResponseI } from '../Models/Response.interface';
import { CrearAbonoComponent } from '../crear-abono/crear-abono.component';
import { AbonoI } from '../Models/AbonoI';
import { InteresI } from '../Models/InteresI';
import { timeController } from '../util/timeController';

@Component({
  selector: 'app-consultar-prestamos',
  templateUrl: './consultar-prestamos.component.html',
  styleUrls: ['../app.component.css','./consultar-prestamos.component.css']
})
export class ConsultarPrestamosComponent {
  constructor (private api: ApiService, private router: Router){

  }

  oPrestamistaString: string | null = localStorage.getItem('oPrestamista');

  prestamos: PrestamoI[] = [];

  errorStatus: boolean = false;
  errorMsj: string = "";

  idPrestamoDesplegado: number = 0;
  prestamoDesplegado: any;

  oTime = new timeController();
  fechaHoy : string = this.oTime.obtenerFechaHoy();

  ngOnInit() : void{
    if (this.oPrestamistaString == null){
      this.cerrarSesion();
    }
    else{
      let oPrestamistaObject : PrestamistaI = JSON.parse(this.oPrestamistaString);

      this.api.consultarPrestamosXPrestamista(oPrestamistaObject.idPrestamista).subscribe(
        (data)=>{
          let dataResponse: ResponseI = data
          if (dataResponse.mensaje == 'ok') {
            let prestamosString = JSON.stringify(dataResponse.response)
            this.prestamos = JSON.parse(prestamosString);
            console.log(this.prestamos);
          }
          else{
            this.errorStatus = true;
            this.errorMsj =  "No se encontraron prestamos para este prestamista.";
          }
        }
      );
    }
  }

  cerrarSesion(){
    localStorage.clear();
    this.router.navigate(['/home']);
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
    console.log(this.prestamoDesplegado);
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
      let oPrestamistaObject : PrestamistaI = JSON.parse(this.oPrestamistaString);

      this.api.consultarPrestamosXPrestamista(oPrestamistaObject.idPrestamista).subscribe(
        (data)=>{
          let dataResponse: ResponseI = data
          if (dataResponse.mensaje == 'ok') {
            let prestamosString = JSON.stringify(dataResponse.response)
            this.prestamos = JSON.parse(prestamosString);
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
