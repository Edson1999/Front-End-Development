import { Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Bebida from './Bebida';

const ListadoBebidas = () => {
  const { drinks } = useSelector((state) => state.drinks);

  return (
    <Row className="mt-4">
      {drinks.map((drink) => (
        <Bebida key={drink.idDrink} drink={drink} />
      ))}
    </Row>
  );
};

export default ListadoBebidas;
