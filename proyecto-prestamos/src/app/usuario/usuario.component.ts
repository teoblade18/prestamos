import { Component } from '@angular/core';
import { UsuarioI } from '../Models/UsuarioI';
import {FormGroup,FormControl,NgModel,Validators,FormBuilder} from '@angular/forms';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';
import { ResponseI } from '../Models/Response.interface';
import { encrypt } from '../util/util-encrypt';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['../app.component.css','./usuario.component.css']
})
export class UsuarioComponent {

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {}

  //#region getters
  get userOrEmail() {
    return this.formUsuario.get('userOrEmail') as FormControl;
  }

  get contrasenia() {
    return this.formUsuario.get('contrasenia') as FormControl;
  }

  //#endregion

  formUsuario = this.fb.group({
    userOrEmail: ['', Validators.required],
    contrasenia: ['', Validators.required]
  })

  usuario : UsuarioI = {
    nombreUsuario : '',
    contraseña : '',
    email : ''
  };

  errorStatus: boolean = false;
  errorMsj: string = '';

  consultarPrestamista(){
    this.usuario  = {
      nombreUsuario : this.userOrEmail.value,
      contraseña : this.contrasenia.value,
      email : this.userOrEmail.value
    };

    console.log(this.usuario.contraseña);

    this.api.consultarPrestamista(this.usuario).subscribe(
      (data) => {
        let dataResponse: ResponseI = data;
        console.log(dataResponse);

        if (dataResponse.mensaje == 'ok') {
          //Esta linea recupera el json: JSON.parse(localStorage.getItem('oPrestamista'))
          let jsonResponse = JSON.stringify(dataResponse.response); // Convertir a JSON
          localStorage.setItem('oPrestamista', jsonResponse);
          this.router.navigate(['/menu']);
        }
      },
    (error) => {
      this.errorStatus = true;
      this.errorMsj =  error.mensaje;
    });
  }

}
