import { Component } from '@angular/core';
import { ClienteI } from '../Models/ClienteI';
import { Router } from '@angular/router';
import { PrestamistaI } from '../Models/PrestamistaI';
import { JsonPipe } from '@angular/common';
import { ApiService } from '../services/api/api.service';
import { ResponseI } from '../Models/Response.interface';

@Component({
  selector: 'app-consulta-clientes',
  templateUrl: './consulta-clientes.component.html',
  styleUrls: ['../app.component.css','./consulta-clientes.component.css']
})
export class ConsultaClientesComponent {

  constructor( private router: Router, private api : ApiService) {}

  errorStatus: boolean = false;
  errorMsj: string = '';
  clientes : ClienteI[] = [];
  clienteEditando: number= 0;

  oPrestamistaString: string | null = localStorage.getItem('oPrestamista');

  ngOnInit(): void {
    if (this.oPrestamistaString == null){
      this.cerrarSesion();
    }
    else{
      let oPrestamistaObject: PrestamistaI = JSON.parse(this.oPrestamistaString);

      console.log(oPrestamistaObject);

      this.api.consultarClientes(oPrestamistaObject.idPrestamista).subscribe(
        (data) => {
          let dataResponse: ResponseI = data;
          console.log(dataResponse);
          if (dataResponse.mensaje == 'ok') {
            let clientesString = JSON.stringify(dataResponse.response)
            this.clientes = JSON.parse(clientesString);
            console.log(dataResponse.response);
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

  editarCliente(idCliente: number){
    this.clienteEditando = idCliente;
  }

  eliminarCliente( idCliente: number){
    console.log(idCliente);

    this.api.eliminarCliente(idCliente).subscribe(
      (data) => {
        let dataResponse: ResponseI = data;
        console.log(dataResponse);

        if (dataResponse.mensaje == 'ok') {
          //Se filtra de la lista de clientes la que se acaba de eliminar
          this.clientes = this.clientes.filter(c => c.idCliente != idCliente);

          console.log(this.clientes)
        }else{
          this.errorStatus = true;
          this.errorMsj =  "No se encontró el cliente";
        }
      },

      (error) => {
        this.errorStatus = true;
        this.errorMsj =  error.mensaje;
      }
    );
  }

}
