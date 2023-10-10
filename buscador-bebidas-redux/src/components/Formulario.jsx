import { useEffect, useState } from 'react';
import { Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerBebidas, obtenerCategorias } from '../redux/slice/thunks';

/* The `Formulario` component is a React functional component that renders a form for searching drinks. */
const Formulario = () => {
  const [busqueda, setBusqueda] = useState({
    nombre: '',
    categoria: '',
  });
  const [alerta, setAlerta] = useState('');

  const { categorias = [] } = useSelector((state) => state.drinks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(obtenerCategorias());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(busqueda).includes('')) {
      setAlerta('Todos los campos son obligatorios');
      return;
    }
    setAlerta('');
    dispatch(obtenerBebidas(busqueda));
  };

  return (
    <Form onSubmit={handleSubmit}>
      {alerta && (
        <Alert variant="danger" className="text-center">
          {alerta}
        </Alert>
      )}
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="nombre">Nombre Bebida</Form.Label>
            <Form.Control
              id="nombre"
              type="text"
              placeholder="Ej: Tequila, Vodka, etc."
              name="nombre"
              value={busqueda?.nombre}
              onChange={(e) =>
                setBusqueda({
                  ...busqueda,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="categoria">Categoría</Form.Label>
            <Form.Select
              id="categoria"
              name="categoria"
              value={busqueda?.categoria}
              onChange={(e) =>
                setBusqueda({
                  ...busqueda,
                  [e.target.name]: e.target.value,
                })
              }
            >
              <option>-- Selecciona una categoría --</option>
              {categorias?.map((categoria) => (
                <option
                  key={categoria.strCategory}
                  value={categoria.strCategory}
                >
                  {categoria.strCategory}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="justify-content-end">
        <Col md={3}>
          <Button
            type="submit"
            variant="danger"
            className="w-100 form-submit-button"
          >
            Buscar
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Formulario;
