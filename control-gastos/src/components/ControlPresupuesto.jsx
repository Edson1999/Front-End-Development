import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({
  gasto,
  setGasto,
  presupuesto,
  setPresupuesto,
  setValidPresupuesto,
}) => {
  const [porcentaje, setPorcentaje] = useState(0);

  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);

  useEffect(() => {
    const totalGastado = gasto.reduce(
      (total, gasto) => total + gasto.cantidad,
      0
    );
    const totalDisponible = presupuesto - gastado;

    // Calculo del porcentaje gastado

    const nuevoPorcentaje = (
      ((presupuesto - totalDisponible) / presupuesto) *
      100
    ).toFixed(2);

    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 1000);

    setGastado(totalGastado);
    setDisponible(totalDisponible);
  }, [gastado, gasto, presupuesto]);

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  const handleResetApp = () => {
    setGasto([]);
    setPresupuesto(0);
    setValidPresupuesto(false);
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas ">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? '#dc3545' : '#003ECA',
            trailColor: '#E2E6EA',
            textColor: porcentaje > 100 ? '#dc3545' : '#64748b',
          })}
          value={porcentaje}
          text={`${porcentaje}% gastado`}
        />
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          Resetear App
        </button>
        <p>
          <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? 'negativo' : ''}`}>
          <span>Disponible: </span> {formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado: </span> {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
};

ControlPresupuesto.propTypes = {
  presupuesto: PropTypes.number,
  setPresupuesto: PropTypes.func,
  gasto: PropTypes.array,
  setGasto: PropTypes.func,
  setValidPresupuesto: PropTypes.func,
};

export default ControlPresupuesto;
