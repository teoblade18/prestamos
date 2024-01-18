import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { RegistrarPrestamistaComponent } from './registrar-prestamista/registrar-prestamista.component';
import { HttpClientModule} from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';
import { CrearClienteComponent } from './crear-cliente/crear-cliente.component';
import { ConsultaClientesComponent } from './consulta-clientes/consulta-clientes.component'

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    RegistrarPrestamistaComponent,
    MenuComponent,
    CrearClienteComponent,
    ConsultaClientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
