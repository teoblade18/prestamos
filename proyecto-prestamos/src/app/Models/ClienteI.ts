import { PrestamistaI } from "./PrestamistaI"

export interface ClienteI{
  idCliente: number,
  nombre : string,
  cedula : string,
  puntaje: number
  numeroCuenta: string,
  maxPrestar: number,
  idPrestamista : number
}
