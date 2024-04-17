import { Router } from "@angular/router";

export class SesionController {

  constructor( private router: Router) {}

  oPrestamistaString: string | null = sessionStorage.getItem('oPrestamista');

  validarSesion(){

    this.oPrestamistaString = sessionStorage.getItem('oPrestamista');

    if (this.oPrestamistaString == null){
      sessionStorage.clear();
      this.router.navigate(['/home']);
    }
  }

}
