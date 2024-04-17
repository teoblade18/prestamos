import { PrestamoI } from "./PrestamoI";

export interface HistorialPrestamoI extends PrestamoI{
  totalAbonos : number,
  totalIntereses : number,
  deudaActual: number
}
