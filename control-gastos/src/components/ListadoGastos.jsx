import PropTypes from 'prop-types';
import Gasto from './Gasto';

/* The code defines a functional component called `ListadoGastos` that takes in several props: `gasto`,
`setGastoEditar`, `eliminarGasto`, `filtro`, and `gastosFiltrados`. */
const ListadoGastos = ({
  gasto,
  setGastoEditar,
  eliminarGasto,
  filtro,
  gastosFiltrados,
}) => {
  return (
    <div className="listado-gastos contenedor">
      {filtro ? (
        <>
          <h2>{gastosFiltrados.length ? 'Gastos' : 'No hay gastos aún'}</h2>
          {gastosFiltrados.map((gastos) => (
            <Gasto
              key={gastos.id}
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
            />
          ))}
        </>
      ) : (
        <>
          <h2>{gasto.length ? 'Gastos' : 'No hay gastos aún'}</h2>
          {gasto.map((gastos) => (
            <Gasto
              key={gastos.id}
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              gastosFiltrados={gastosFiltrados}
            />
          ))}
        </>
      )}
    </div>
  );
};

ListadoGastos.propTypes = {
  gasto: PropTypes.array,
  setGastoEditar: PropTypes.func,
  eliminarGasto: PropTypes.func,
  filtro: PropTypes.string,
  gastosFiltrados: PropTypes.array,
};

export default ListadoGastos;
