import { Injectable } from "@angular/core";
import { PrestamistaI } from "src/app/Models/PrestamistaI";
import { ResponseI } from "src/app/Models/Response.interface";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ApiService{

  url: string = "http://localhost:5032/api/Prestamista/Guardar"

  constructor(private http:HttpClient){  }

  registrarPrestamista(form : PrestamistaI): Observable<ResponseI>{
    let direccion = this.url;

    return this.http.post<ResponseI>(direccion, form);
  }

}
