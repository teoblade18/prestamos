import { Component } from '@angular/core';
import { Usuario } from '../../Class/Usuario';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['../app.component.css','./usuario.component.css']
})
export class UsuarioComponent {
  nombreUsuario = "Magudelo";
  contraseña = "123456";

  mensajeError = "Tenemos un problema";

  //usuarioActual  = new Usuario();
  //usuarioActual.nombreUsuario = "Magudelo";

}
