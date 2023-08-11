import PropTypes from 'prop-types';
import ControlPresupuesto from './ControlPresupuesto';
import NuevoPresupuesto from './NuevoPresupuesto';

const Header = ({
  gasto,
  setGasto,
  presupuesto,
  setPresupuesto,
  validPresupuesto,
  setValidPresupuesto,
}) => {
  return (
    <header>
      <h1>Planificador de Gastos</h1>

      {validPresupuesto ? (
        <ControlPresupuesto
          gasto={gasto}
          setGasto={setGasto}
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setValidPresupuesto={setValidPresupuesto}
        />
      ) : (
        <NuevoPresupuesto
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setValidPresupuesto={setValidPresupuesto}
        />
      )}
    </header>
  );
};

Header.propTypes = {
  presupuesto: PropTypes.number,
  setPresupuesto: PropTypes.func,
  validPresupuesto: PropTypes.bool,
  setValidPresupuesto: PropTypes.func,
  gasto: PropTypes.array,
  setGasto: PropTypes.func,
};

export default Header;
