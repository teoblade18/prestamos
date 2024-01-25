import { Component, Input } from '@angular/core';
import { FormBuilder, Validators, FormControl} from '@angular/forms';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';
import { PrestamistaI } from '../Models/PrestamistaI';
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

  get cliente(){
    return this.formPrestamo.get('cliente') as FormControl;
  }

  get fechaInicial() {
    return this.formPrestamo.get('fechaInicial') as FormControl;
  }

  get montoInicial() {
    return this.formPrestamo.get('montoInicial') as FormControl;
  }

  oTime = new timeController();
  fechaHoy : string = this.oTime.obtenerFechaHoy();

  formPrestamo = this.fb.group({
    cliente: [0, [Validators.required, Validators.min(1)]],
    fechaInicial: [this.fechaHoy , [Validators.required]],
    montoInicial: ['', [Validators.required, Validators.min(1)]],
    tipoInteres: [0, [Validators.required, Validators.pattern(/^\d+$/)]],
    porcentajeInteres: [5, [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)]],
    diaCorte: [0, [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)]],
    fechaPago: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)]]
  });

  @Input() dataEntrante : any;
  clientes : ClienteI[] = [];

  errorStatus: boolean = false;
  errorMsj: string = '';

  oPrestamistaString: string | null = localStorage.getItem('oPrestamista');

  ngOnInit(): void {
    if (this.oPrestamistaString == null){
      this.cerrarSesion();
    }
    else{
      let oPrestamistaObject: PrestamistaI = JSON.parse(this.oPrestamistaString);

      this.api.consultarClientes(oPrestamistaObject.idPrestamista).subscribe(
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

}
