import { Component,Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder,FormControl, Validators } from '@angular/forms';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';
import { timeController } from '../util/timeController';
import { AbonoI } from '../Models/AbonoI';
import { ResponseI } from '../Models/Response.interface';

@Component({
  selector: 'app-crear-abono',
  templateUrl: './crear-abono.component.html',
  styleUrls: ['../app.component.css','./crear-abono.component.css']
})
export class CrearAbonoComponent {
  constructor (private fb: FormBuilder, private api: ApiService, private router: Router){ }

  //#region variables
  get fecha(){
    return this.formAbono.get('fecha') as FormControl;
  }

  get valor() {
    return this.formAbono.get('valor') as FormControl;
  }
  //#endregion

  @Input() dataEntrante: any;
  oTime = new timeController();
  fechaHoy : string = this.oTime.obtenerFechaHoy();
  @Output() crearAbonoFinalizado = new EventEmitter<AbonoI>();

  formAbono = this.fb.group({
    fecha : [this.fechaHoy , [Validators.required]],
    valor : [0, [Validators.required, Validators.min(1)]]
  });

  abono : AbonoI = {
    idAbono: 0,
    fecha: this.fechaHoy,
    valor: 0,
    idPrestamo: 0
  }

  errorStatus: boolean = false;
  errorMsj: string = '';

  ngOnInit(): void {
    if(this.dataEntrante == null){
      this.router.navigate(['/consultar-prestamos']);
    }
  }

  registrarAbono(){
    this.abono = {
      idAbono: 0,
      fecha: this.fecha.value,
      valor: this.valor.value,
      idPrestamo: this.dataEntrante
    }

    this.api.registrarAbono(this.abono).subscribe(
      (data) => {
        let dataResponse: ResponseI = data;
        if (dataResponse.mensaje == 'ok') {
          this.formAbono.reset();
          this.crearAbonoFinalizado.emit(this.abono);
        }
      },

      (error) => {
        this.errorStatus = true;
        this.errorMsj =  error.mensaje;
      }
    );
  }

  cerrarModal(){
    this.formAbono.reset();
    this.crearAbonoFinalizado.emit();
  }
}
