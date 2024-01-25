export class timeController {
  obtenerFechaHoy(): string {
    const fechaHoy = new Date();
    const year = fechaHoy.getFullYear();
    const month = this.padZero(fechaHoy.getMonth() + 1); // Los meses en JavaScript son de 0 a 11
    const day = this.padZero(fechaHoy.getDate());
    return `${year}-${month}-${day}`;
  }

  // Método auxiliar para añadir ceros a la izquierda si es necesario
  private padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}
