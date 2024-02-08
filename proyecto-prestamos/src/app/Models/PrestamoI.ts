<<<<<<< HEAD
import { AbonoI } from "./AbonoI";
import { ClienteI } from "./ClienteI";
import { InteresI } from "./InteresI";
=======
import { ClienteI } from "./ClienteI";
>>>>>>> acb2fe6c3ab67329e292555ef59495c0014504b6

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
<<<<<<< HEAD
  abonos: AbonoI[]
  intereses: InteresI[]
=======
>>>>>>> acb2fe6c3ab67329e292555ef59495c0014504b6
}
