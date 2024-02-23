import { Component,Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder,FormControl, Validators } from '@angular/forms';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';
import { timeController } from '../util/timeController';
import { InteresI } from '../Models/InteresI';
import { ResponseI } from '../Models/Response.interface';
import { PrestamoI } from '../Models/PrestamoI';

@Component({
  selector: 'app-crear-interes',
  templateUrl: './crear-interes.component.html',
  styleUrls: ['../app.component.css','./crear-interes.component.css']
})
export class CrearInteresComponent {
  constructor (private fb: FormBuilder, private api: ApiService, private router: Router){ }

  //#region variables
  get fecha(){
    return this.formInteres.get('fecha') as FormControl;
  }

  get tipo(){
    return this.formInteres.get('tipo') as FormControl;
  }

  get valor() {
    return this.formInteres.get('valor') as FormControl;
  }
  //#endregion

  @Input() prestamo: any;
  oTime = new timeController();
  fechaHoy : string = this.oTime.obtenerFechaHoy();
  @Output() crearInteresFinalizado = new EventEmitter<InteresI>();

  tiposInteres : string[] = ['Estandar', 'Mora'];

  formInteres = this.fb.group({
    fecha : [this.fechaHoy , [Validators.required]],
    tipo : ['Estandar', [Validators.required]],
    valor : [0, [Validators.required, Validators.min(1)]]
  });

  interes : InteresI = {
    idInteres: 0,
    fecha: this.fechaHoy,
    valor: 0,
    tipo: 'Estandar',
    idPrestamo: 0
  }

  errorStatus: boolean = false;
  errorMsj: string = '';

  ngOnInit(): void {
    if(this.prestamo == null){
      this.router.navigate(['/consultar-prestamos']);
    }
    else{
      let prestamo = this.prestamo as PrestamoI;

      this.formInteres.get('valor')?.setValue(prestamo.montoReal * (prestamo.porcentaje / 100));
    }


  }

  registrarInteres(){
    this.interes = {
      idInteres: 0,
      fecha: this.fecha.value,
      valor: this.valor.value,
      tipo: this.tipo.value,
      idPrestamo: this.prestamo.idPrestamo
    }

    this.api.registrarInteres(this.interes).subscribe(
      (data) => {
        let dataResponse: ResponseI = data;
        if (dataResponse.mensaje == 'ok') {
          this.formInteres.reset();
          this.crearInteresFinalizado.emit(this.interes);
        }
      },

      (error) => {
        this.errorStatus = true;
        this.errorMsj =  error.mensaje;
      }
    );
  }

  cerrarModal(){
    this.formInteres.reset();
    this.crearInteresFinalizado.emit();
  }
}

