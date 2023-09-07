import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Col, Card, Button } from 'react-bootstrap';
import ModalBebida from './ModalBebida';
import { obtenerBebidaId } from '../redux/slice/thunks';

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
