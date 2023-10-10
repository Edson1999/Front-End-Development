/**
 * The function `generarId` generates a unique ID by combining a random string and the current
 * timestamp.
 * @returns The function `generarId` returns a string that is a combination of a random alphanumeric
 * string and the current timestamp in base 36.
 */
export const generarId = () => {
  const random = Math.random().toString(36).substr(2);
  const fecha = Date.now().toString(36);

  return random + fecha;
};

/**
 * The function `generarFecha` takes a date as input and returns a formatted string representation of
 * the date in Spanish.
 * @param fecha - The parameter "fecha" is a string representing a date in a specific format.
 * @returns The function `generarFecha` returns a formatted date string in Spanish language.
 */
export const generarFecha = (fecha) => {
  const fechaNueva = new Date(fecha);

  const opciones = { year: 'numeric', month: 'long', day: '2-digit' };

  return fechaNueva.toLocaleDateString('es-Es', opciones);
};
