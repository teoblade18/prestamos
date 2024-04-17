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

  oPrestamistaString: string | null = sessionStorage.getItem('oPrestamista');

  ngOnInit(): void {
    if (this.oPrestamistaString == null){
      this.cerrarSesion();
    }
    else{
      let idPrestamista: any = JSON.parse(this.oPrestamistaString);

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
    sessionStorage.clear();
    this.router.navigate(['/home']);
  }

  editarCliente(idCliente: number){
    this.clienteEditando = idCliente;
  }

  finalizarEdicion(clienteEditado : ClienteI){
    const indiceCliente = this.clientes.findIndex(c => c.idCliente === clienteEditado.idCliente);

    if (indiceCliente !== -1) {
      this.clientes[indiceCliente] = clienteEditado;
    }

    this.clienteEditando = 0;
  }

  eliminarCliente( idCliente: number){

    this.api.eliminarCliente(idCliente).subscribe(
      (data) => {
        let dataResponse: ResponseI = data;

        if (dataResponse.mensaje == 'ok') {
          //Se filtra de la lista de clientes la que se acaba de eliminar
          this.clientes = this.clientes.filter(c => c.idCliente != idCliente);
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
