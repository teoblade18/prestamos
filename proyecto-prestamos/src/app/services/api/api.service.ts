import { Injectable } from "@angular/core";
import { PrestamistaI } from "src/app/Models/PrestamistaI";
import { ResponseI } from "src/app/Models/Response.interface";
import { HttpClient, HttpErrorResponse  } from "@angular/common/http";
import { Observable, throwError, catchError } from "rxjs";
import { UsuarioI } from "src/app/Models/UsuarioI";
import { ClienteI } from "src/app/Models/ClienteI";
import { PrestamoI } from "src/app/Models/PrestamoI";
import { AbonoI } from "src/app/Models/AbonoI";
import { InteresI } from "src/app/Models/InteresI";

@Injectable({
  providedIn: 'root'
})

export class ApiService{

  url: string = "http://localhost:5032/"

  constructor(private http:HttpClient){  }

  //#region Prestamista
  consultarPrestamista(form : UsuarioI): Observable<ResponseI>{
    let direccion = this.url + "api/Prestamista/ConsultarXUsuario"

    return this.http.post<ResponseI>(direccion, form).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  obtenerPrestamista(idPrestamista : number): Observable<ResponseI>{
    let direccion = this.url + `api/Prestamista/Obtener/${idPrestamista}`

    return this.http.get<ResponseI>(direccion).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  registrarPrestamista(form : PrestamistaI): Observable<ResponseI>{

    let direccion = this.url + "api/Prestamista/Guardar";

    return this.http.post<ResponseI>(direccion, form).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  editarPrestamista(form : PrestamistaI): Observable<ResponseI>{

    let direccion = this.url + "api/Prestamista/Editar";

    return this.http.put<ResponseI>(direccion, form).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  consultarCapitalPrestamista(idPrestamista : number): Observable<ResponseI>{
    let direccion = this.url + `api/Prestamista/ConsultarCapital/${idPrestamista}`

    return this.http.get<ResponseI>(direccion).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  //#endregion

  //#region Cliente
  registrarCliente(form : ClienteI): Observable<ResponseI>{

    let direccion = this.url + "api/Cliente/Guardar";

    return this.http.post<ResponseI>(direccion, form).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  consultarClientes(idPrestamista : number): Observable<ResponseI>{

    let direccion = this.url + `api/Cliente/ObtenerClientesXPrestamista/${idPrestamista}`;

    return this.http.get<ResponseI>(direccion).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  editarCliente(form : ClienteI): Observable<ResponseI>{

    let direccion = this.url + "api/Cliente/Editar";

    return this.http.put<ResponseI>(direccion, form).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  eliminarCliente(idCliente : number): Observable<ResponseI>{

    let direccion = this.url + `api/Cliente/Eliminar/${idCliente}`;

    return this.http.delete<ResponseI>(direccion).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
  //#endregion

  //#region Préstamo

  registrarPrestamo(form : PrestamoI): Observable<ResponseI>{

    let direccion = this.url + "api/Prestamo/Guardar";

    return this.http.post<ResponseI>(direccion, form).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  ConsultarNumeroPrestamosXCliente(idCliente : number): Observable<ResponseI>{

    let direccion = this.url + `api/Prestamo/ConsultarNumeroPrestamosXCliente/${idCliente}`;

    return this.http.get<ResponseI>(direccion).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  consultarPrestamosXPrestamista(idPrestamista : number): Observable<ResponseI>{
    let direccion = this.url + `api/Prestamo/ConsultarPrestamosXPrestamista/${idPrestamista}`;

    return this.http.get<ResponseI>(direccion).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  cancelarPrestamo(prestamo : PrestamoI): Observable<ResponseI>{
    let direccion = this.url + `api/Prestamo/Cancelar`;

    return this.http.put<ResponseI>(direccion, prestamo).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  consultarHistorialPrestamos(idPrestamista : number): Observable<ResponseI>{
    let direccion = this.url + `api/Prestamo/ConsultarHistorialPrestamos/${idPrestamista}`;

    return this.http.get<ResponseI>(direccion).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  //#endregion

  //#region Abono

  registrarAbono(form : AbonoI): Observable<ResponseI>{

    let direccion = this.url + "api/Abono/Guardar";

    return this.http.post<ResponseI>(direccion, form).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  eliminarAbono(idAbono : number): Observable<ResponseI>{

    let direccion = this.url + `api/Abono/Eliminar/${idAbono}`;

    return this.http.delete<ResponseI>(direccion).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  //#endregion

  //#region Interes

  registrarInteres(form : InteresI): Observable<ResponseI>{

    let direccion = this.url + "api/Interes/Guardar";

    return this.http.post<ResponseI>(direccion, form).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  eliminarInteres(idInteres : number): Observable<ResponseI>{

    let direccion = this.url + `api/Interes/Eliminar/${idInteres}`;

    return this.http.delete<ResponseI>(direccion).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  //#endregion



  private handleError(error: HttpErrorResponse): Observable<ResponseI> {

    const customResponse: ResponseI = {
      mensaje: error.message,
      response: 'No aplica'
    };

    return throwError(customResponse);
  }
}
