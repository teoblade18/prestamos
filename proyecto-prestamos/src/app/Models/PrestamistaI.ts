import { UsuarioI } from "./UsuarioI"

export interface PrestamistaI{
  idPrestamista: number,
  nombre : string,
  capital : number,
  numeroCuenta: string,
  oUsuario : UsuarioI;
}
