import PropTypes from 'prop-types';
import { useState } from 'react';
import Mensaje from './Mensaje';

const NuevoPresupuesto = ({
  presupuesto,
  setPresupuesto,
  setValidPresupuesto,
}) => {
  const [mensaje, setMensaje] = useState('');

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
