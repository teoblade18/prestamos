import { Component } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';
import { PrestamistaI } from '../Models/PrestamistaI';
import { PrestamoI } from '../Models/PrestamoI';
import { ResponseI } from '../Models/Response.interface';

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
    }
    else{
      this.idPrestamoDesplegado = 0;
    }
  }

  eliminarAbono(idAbono: number){
    if(confirm('¿Estás seguro de eliminar este abono?')){
      this.api.eliminarAbono(idAbono).subscribe(
        (data)=>{
          let dataResponse: ResponseI = data
          if (dataResponse.mensaje == 'ok') {
            console.log('Abono eliminado');
          }
          else{
            this.errorStatus = true;
            this.errorMsj =  "No se encontraron abonos con este id.";
          }
        }
      );
    }
  }
}
