import PropTypes from 'prop-types';

/**
 * The `Filtros` component is a form that allows users to select a category to filter expenses.
 * @returns The code is returning a component that renders a form with a select dropdown menu. The
 * selected value of the dropdown is controlled by the "filtro" prop, and when the value is changed,
 * the "setFiltro" function is called to update the value. The options in the dropdown represent
 * different categories for filtering expenses.
 */
const Filtros = ({ filtro, setFiltro }) => {
  return (
    <div className="filtros sombra contenedor">
      <form>
        <div className="campo">
          <label>Filtrar gastos</label>
          <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
            <option value="">-- Todas las categorías --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
      </form>
    </div>
  );
};

Filtros.propTypes = {
  filtro: PropTypes.string,
  setFiltro: PropTypes.func,
};

export default Filtros;
