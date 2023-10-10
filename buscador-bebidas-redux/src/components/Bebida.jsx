import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Col, Card, Button } from 'react-bootstrap';
import ModalBebida from './ModalBebida';
import { obtenerBebidaId } from '../redux/slice/thunks';

/**
 * The Bebida component is a React component that displays a card with a drink image and name, and a
 * button to view the recipe of the drink in a modal.
 * @returns The code is returning a component that displays a Card with an image and title of a drink.
 * It also includes a button that, when clicked, triggers a function to show a modal with the recipe of
 * the drink. The modal is rendered conditionally based on the value of the "show" state variable.
 */
const Bebida = ({ drink }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const dispatch = useDispatch();

  return (
    <>
      <Col md={6} lg={3}>
        <Card className="mb-4 p-2">
          <Card.Img
            variant="top"
            src={drink?.strDrinkThumb}
            alt={`Imagen de ${drink.strDrink}`}
          />
          <Card.Body>
            <Card.Title>{drink.strDrink}</Card.Title>
            <Button
              // ejecuta el thunk en el onClick
              onClick={() => {
                handleShow();
                dispatch(obtenerBebidaId(drink?.idDrink));
              }}
              variant={'warning'}
              className="w-100 mt-2"
            >
              Ver Receta
            </Button>
          </Card.Body>
        </Card>
      </Col>
      <ModalBebida show={show} onHide={handleClose} onCancel={handleClose} />
    </>
  );
};

Bebida.propTypes = {
  drink: PropTypes.object,
};

export default Bebida;
