import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['../app.component.css','./menu.component.css']
})
export class MenuComponent {

  constructor( private router: Router) {}

  oPrestamistaString: string | null = sessionStorage.getItem('oPrestamista');

  ngOnInit(): void {
    if (this.oPrestamistaString == null){
      this.cerrarSesion();
    }
  }

  cerrarSesion(){
    sessionStorage.clear();
    this.router.navigate(['/home']);
  }

}
