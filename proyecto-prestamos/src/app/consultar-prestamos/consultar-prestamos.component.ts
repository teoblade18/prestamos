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
            let prestamsString = JSON.stringify(dataResponse.response)
            this.prestamos = JSON.parse(prestamsString);
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
}
