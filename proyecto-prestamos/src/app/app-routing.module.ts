import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { RegistrarPrestamistaComponent } from './registrar-prestamista/registrar-prestamista.component';
import { AppComponent } from './app.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { CrearClienteComponent } from './crear-cliente/crear-cliente.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: UsuarioComponent},
  {path: 'registrar-prestamista', component: RegistrarPrestamistaComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'crear-cliente', component: CrearClienteComponent},
  {path: '**', component: UsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
