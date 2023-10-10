import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useSelectMoneda from '../hooks/useSelectMoneda';
import { moneda } from '../data/monedas';
import Error from './Error';

/* The `const InputSubmit = styled.input` is creating a styled component using the `styled` function
from the `@emotion/styled` library. It is styling an `input` element with the specified CSS
properties. */
const InputSubmit = styled.input`
  border-radius: 2rem;
  background-color: #f8f9fa;
  width: 100%;
  padding: 1rem;
  border: none;
  color: #000000;
  font-weight: 400;
  font-size: 1.6rem;
  font-family: 'Canaro', sans-serif;
  transition: background-color 0.3s ease;
  margin-top: 1.6rem;

  &:hover {
    cursor: pointer;
    background-color: #e2e6ea;
  }
`;

/**
 * The `Formulario` component is a form that allows users to select a currency and a cryptocurrency,
 * and then submit the form to get a quote.
 * @returns The `Formulario` component returns a form with two select inputs (`SelectMoneda` and
 * `SelectCriptomoneda`) and a submit button (`InputSubmit`). It also conditionally renders an error
 * message (`Error`) if the `error` state is true.
 */
const Formulario = ({ setMonedas }) => {
  const [criptos, setCriptos] = useState([]);
  const [error, setError] = useState(false);

  const [monedas, SelectMoneda] = useSelectMoneda('Elije tu moneda', moneda);
  const [criptomoneda, SelectCriptomoneda] = useSelectMoneda(
    'Elije tu Criptomoneda',
    criptos
  );

  /* The `useEffect` hook is used to perform side effects in a functional component. In this case, it is
making an API call to retrieve data about cryptocurrencies. */
  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      const arrayCriptos = resultado.Data.map((criptos) => {
        const cripto = {
          id: criptos.CoinInfo.Name,
          nombre: criptos.CoinInfo.FullName,
        };

        return cripto;
      });
      setCriptos(arrayCriptos);
    };
    consultarAPI();
  }, []);

  /**
   * The handleSubmit function prevents the default form submission, checks if the monedas and
   * criptomoneda variables are empty, sets an error state if they are, and sets the monedas state with
   * the values of monedas and criptomoneda.
   * @returns nothing.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if ([monedas, criptomoneda].includes('')) {
      setError(true);
      return;
    }
    setError(false);
    setMonedas({ monedas, criptomoneda });
  };

  return (
    <>
      {error && <Error>Todos los campos son obligatorios*</Error>}
      <form onSubmit={handleSubmit}>
        <SelectMoneda />
        <SelectCriptomoneda />
        <InputSubmit type="submit" value="Cotizar" />
      </form>
    </>
  );
};

Formulario.propTypes = {
  setMonedas: PropTypes.func,
};

export default Formulario;
