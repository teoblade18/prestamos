import { Injectable } from "@angular/core";
import { PrestamistaI } from "src/app/Models/PrestamistaI";
import { ResponseI } from "src/app/Models/Response.interface";
import { HttpClient, HttpErrorResponse  } from "@angular/common/http";
import { Observable, throwError, catchError } from "rxjs";
import { UsuarioI } from "src/app/Models/UsuarioI";
import { ClienteI } from "src/app/Models/ClienteI";

@Injectable({
  providedIn: 'root'
})

export class ApiService{

  url: string = "http://localhost:5032/"

  constructor(private http:HttpClient){  }

  consultarPrestamista(form : UsuarioI): Observable<ResponseI>{
    let direccion = this.url + "api/Prestamista/ConsultarXUsuario"

    return this.http.post<ResponseI>(direccion, form).pipe(
      catchError(this.handleError)
    );
  }

  registrarPrestamista(form : PrestamistaI): Observable<ResponseI>{

    let direccion = this.url + "api/Prestamista/Guardar";

    return this.http.post<ResponseI>(direccion, form).pipe(
      catchError(this.handleError)
    );
  }

  registrarCliente(form : ClienteI): Observable<ResponseI>{

    let direccion = this.url + "api/Cliente/Guardar";

    return this.http.post<ResponseI>(direccion, form).pipe(
      catchError(this.handleError)
    );
  }

  consultarClientes(idPrestamista : number): Observable<ResponseI>{

    let direccion = this.url + `api/Cliente/ObtenerClientesXPrestamista/${idPrestamista}`;

    return this.http.get<ResponseI>(direccion).pipe(
      catchError(this.handleError)
    );
  }

  eliminarCliente(idCliente : number): Observable<ResponseI>{

    let direccion = this.url + `api/Cliente/Eliminar/${idCliente}`;

    return this.http.delete<ResponseI>(direccion).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<ResponseI> {

    const customResponse: ResponseI = {
      mensaje: error.message,
      response: 'No aplica'
    };

    return throwError(customResponse);
  }
}
