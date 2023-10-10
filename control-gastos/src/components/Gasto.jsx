import PropTypes from 'prop-types';
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { generarFecha } from '../helpers';
import IconoAhorro from '../img/icono_ahorro.svg';
import IconoCasa from '../img/icono_casa.svg';
import IconoComida from '../img/icono_comida.svg';
import IconoGastos from '../img/icono_gastos.svg';
import IconoOcio from '../img/icono_ocio.svg';
import IconoSalud from '../img/icono_salud.svg';
import IconoSuscripciones from '../img/icono_suscripciones.svg';

/* The `diccionarioIconos` constant is an object that maps category names to corresponding icon images.
Each key in the object represents a category name, and the value associated with that key is the
corresponding icon image. */
const diccionarioIconos = {
  ahorro: IconoAhorro,
  comida: IconoComida,
  casa: IconoCasa,
  gastos: IconoGastos,
  ocio: IconoOcio,
  salud: IconoSalud,
  suscripciones: IconoSuscripciones,
};

/**
 * The `Gasto` component is a React component that renders a swipeable list item displaying information
 * about an expense, including its name, amount, category, and date.
 * @returns The component is returning a SwipeableList component with a SwipeableListItem inside. The
 * SwipeableListItem has leadingActions and trailingActions, which are components that provide swipe
 * actions for the list item. Inside the SwipeableListItem, there is a div with the class "gasto
 * sombra" that contains the content of the expense. The content includes an image, a description of
 * the expense, and the
 */
const Gasto = ({ gastos, setGastoEditar, eliminarGasto }) => {
  const { nombre, cantidad, categoria, id, fecha } = gastos;

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setGastoEditar(gastos)}>Editar</SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={() => eliminarGasto(id)}>
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );
  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img src={diccionarioIconos[categoria]} alt="icono gasto" />
            <div className="descripcion-gasto">
              <p className="categoria">{categoria}</p>
              <p className="nombre-gasto">{nombre}</p>
              <p className="fecha-gasto">
                Agregado: <span>{generarFecha(fecha)}</span>
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">${cantidad}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

Gasto.propTypes = {
  gastos: PropTypes.object,
  setGastoEditar: PropTypes.func,
  eliminarGasto: PropTypes.func,
};

export default Gasto;
