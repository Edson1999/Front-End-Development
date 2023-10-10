import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Modal, Image, Button } from 'react-bootstrap';

/**
 * The `ModalBebida` component is a React component that displays a modal with drink details, including
 * the drink name, image, instructions, and a list of ingredients and quantities.
 * @returns The component is returning a Modal component from a UI library. The Modal component
 * displays information about a drink, including an image, the drink name, instructions, and a list of
 * ingredients and quantities. The Modal also includes a footer with a "Cerrar" button to close the
 * Modal. The content of the Modal is conditionally rendered based on the isLoading state, so it will
 * only be displayed when the data
 */
const ModalBebida = (props) => {
  const { ingredient = [], isLoading } = useSelector((state) => state.drinks);
  const { show, onHide, onCancel } = props;

  const mostrarIngredientes = () => {
    let ingredientes = [];

    for (let i = 1; i < 16; i++) {
      if (ingredient[`strIngredient${i}`]) {
        ingredientes.push(
          <li>
            {ingredient[`strIngredient${i}`]} {'-'}{' '}
            {ingredient[`strMeasure${i}`]}
          </li>
        );
      }
    }
    return ingredientes;
  };

  return (
    !isLoading && (
      <Modal show={show} onHide={onHide} onCancel={onCancel}>
        <Image
          src={ingredient?.strDrinkThumb}
          alt={`Imagen de ${ingredient?.strDrink}`}
        />
        <Modal.Header>
          <Modal.Title>{ingredient?.strDrink}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h2>Instrucciones</h2>
            <p className="modal-instructions">{ingredient?.strInstructions}</p>
          </div>
          <div>
            <h2>Ingredientes y Cantidades</h2>
            <p className="modal-instructions">{mostrarIngredientes()}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onCancel}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    )
  );
};

ModalBebida.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onCancel: PropTypes.func,
};

export default ModalBebida;
