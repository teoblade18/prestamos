import { PrestamistaI } from "./PrestamistaI"

export interface ClienteI{
  idCliente: number,
  nombre : string,
  cedula : string,
  numeroCuenta: string,
  idPrestamista : number
}
