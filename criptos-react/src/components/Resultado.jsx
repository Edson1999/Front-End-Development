import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Contenedor = styled.div`
  background-color: #ffffff;
  padding: 0.8rem 1.6rem;
  margin-top: 2rem;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
`;

const Imagen = styled.img`
  display: block;
  width: 15rem;
`;

const Texto = styled.p`
  span {
    font-weight: 600;
  }
`;

const Precio = styled.p`
  font-size: 1.8rem;
  span {
    font-weight: 600;
    color: #ffc107;
  }
`;

const Resultado = ({ resultado }) => {
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } =
    resultado;
  return (
    <Contenedor>
      <Imagen
        src={`https://cryptocompare.com/${IMAGEURL}`}
        alt="imagen cripto"
      />
      <div>
        <Precio>
          Precio actual: <span>{PRICE}</span>
        </Precio>
        <Texto>
          Precio más alto del día: <span>{HIGHDAY}</span>
        </Texto>
        <Texto>
          Precio más bajo del día: <span>{LOWDAY}</span>
        </Texto>
        <Texto>
          Variación de las últimas 24 horas: <span>{CHANGEPCT24HOUR}</span>
        </Texto>
        <Texto>
          Última actualización: <span>{LASTUPDATE}</span>
        </Texto>
      </div>
    </Contenedor>
  );
};

Resultado.propTypes = {
  resultado: PropTypes.object,
};

export default Resultado;
