import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { RegistrarPrestamistaComponent } from './registrar-prestamista/registrar-prestamista.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: '', redirectTo:'registrar'},
  {path: 'registrar', component: AppComponent},
  {path: 'menu', component: MenuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
