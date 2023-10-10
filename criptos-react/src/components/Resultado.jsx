import PropTypes from 'prop-types';
import styled from '@emotion/styled';

/* The code `const Contenedor = styled.div` is creating a styled component called `Contenedor`. This
component is a `div` element with specific styles applied to it. The styles include a white
background color, padding, margin-top, border-radius, display as flex, align-items and
justify-content as center, and a gap between child elements. This styled component can be used in
the React component to render a `div` element with these styles. */
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

/* The code `const Imagen = styled.img` is creating a styled component called `Imagen`. This component
is an `img` element with specific styles applied to it. The styles include setting the display
property to block and setting the width to 15rem. This styled component can be used in the React
component to render an `img` element with these styles. */
const Imagen = styled.img`
  display: block;
  width: 15rem;
`;

/* The code `const Texto = styled.p` is creating a styled component called `Texto`. This component is a
`p` element with specific styles applied to it. The styles include setting the font-weight of any
`span` element inside the `p` element to 600. */
const Texto = styled.p`
  span {
    font-weight: 600;
  }
`;

/* The code `const Precio = styled.p` is creating a styled component called `Precio`. This component is
a `p` element with specific styles applied to it. The styles include setting the font-size to
1.8rem. Additionally, any `span` element inside the `p` element will have a font-weight of 600 and a
color of #ffc107 (a shade of yellow). This styled component can be used in the React component to
render a `p` element with these styles. */
const Precio = styled.p`
  font-size: 1.8rem;
  span {
    font-weight: 600;
    color: #ffc107;
  }
`;

/**
 * The `Resultado` component displays information about a cryptocurrency, including its current price,
 * highest and lowest prices of the day, percentage change in the last 24 hours, and last update time.
 * @returns The component is returning a JSX structure that displays information about a
 * cryptocurrency. It includes an image, the current price, the highest and lowest prices of the day,
 * the percentage change in the last 24 hours, and the last update time.
 */
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
