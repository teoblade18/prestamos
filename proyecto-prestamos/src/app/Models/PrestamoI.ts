import { ClienteI } from "./ClienteI";

export interface PrestamoI{
  idPrestamo: number,
  idCliente : number,
  idPrestamista : number,
  fechaInicial: string,
  porcentaje: number,
  tipoIntereses: string,
  diaCorte : number,
  montoInicial : number,
  montoReal: number,
  fechaPago: string,
  oCliente: ClienteI
}
