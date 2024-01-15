import { Router } from "@angular/router";

export class SesionController {

  constructor( private router: Router) {}

  oPrestamistaString: string | null = localStorage.getItem('oPrestamista');

  validarSesion(){

    this.oPrestamistaString = localStorage.getItem('oPrestamista');

    if (this.oPrestamistaString == null){
      localStorage.clear();
      this.router.navigate(['/home']);
    }
  }

}
