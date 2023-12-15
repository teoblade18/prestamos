import { Usuario } from "./Usuario"

export interface Prestamista{
  nombre : string,
  capital : number,
  numeroCuenta: string,
  usuario : Usuario;
}
