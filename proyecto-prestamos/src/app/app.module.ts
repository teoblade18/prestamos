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
import { ConsultaClientesComponent } from './consulta-clientes/consulta-clientes.component';
import { CrearPrestamoComponent } from './crear-prestamo/crear-prestamo.component';
import { ConsultarPrestamosComponent } from './consultar-prestamos/consultar-prestamos.component';
import { CrearAbonoComponent } from './crear-abono/crear-abono.component';
import { CrearInteresComponent } from './crear-interes/crear-interes.component';
import { HistorialPrestamosComponent } from './historial-prestamos/historial-prestamos.component';
import { NgPipesModule } from 'ngx-pipes';
import { ContactoComponent } from './contacto/contacto.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    RegistrarPrestamistaComponent,
    MenuComponent,
    CrearClienteComponent,
    ConsultaClientesComponent,
    CrearPrestamoComponent,
    ConsultarPrestamosComponent,
    CrearAbonoComponent,
    CrearInteresComponent,
    HistorialPrestamosComponent,
    ContactoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgPipesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
