import PropTypes from 'prop-types';
import { useState } from 'react';
import Mensaje from './Mensaje';

/**
 * The `NuevoPresupuesto` function is a React component that renders a form for inputting a budget and
 * displays an error message if the budget is invalid.
 * @returns The function `NuevoPresupuesto` returns JSX elements, specifically a `<div>` element
 * containing a form with input fields and a submit button. It also conditionally renders a `<Mensaje>`
 * component if the `mensaje` state variable is truthy.
 */
const NuevoPresupuesto = ({
  presupuesto,
  setPresupuesto,
  setValidPresupuesto,
}) => {
  const [mensaje, setMensaje] = useState('');

  /**
   * The function "handlePresupuesto" validates a given budget and sets a message and a flag based on its
   * validity.
   * @returns nothing (undefined).
   */
  const handlePresupuesto = (e) => {
    e.preventDefault();

    if (!presupuesto || presupuesto < 0) {
      setMensaje('No es un presupuesto válido');
      return;
    }
    setMensaje('');
    setValidPresupuesto(true);
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form onSubmit={handlePresupuesto} className="formulario">
        <div className="campo">
          <label>Definir presupuesto</label>
          <input
            className="nuevo-presupuesto"
            type="number"
            placeholder="Añade tu presupuesto"
            value={presupuesto}
            onChange={(e) => setPresupuesto(Number(e.target.value))}
          />
        </div>
        <input type="submit" value="Añadir" />
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
      </form>
    </div>
  );
};

NuevoPresupuesto.propTypes = {
  presupuesto: PropTypes.number,
  setPresupuesto: PropTypes.func,
  setValidPresupuesto: PropTypes.func,
};

export default NuevoPresupuesto;
