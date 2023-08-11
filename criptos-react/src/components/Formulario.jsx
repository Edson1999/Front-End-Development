import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useSelectMoneda from '../hooks/useSelectMoneda';
import { moneda } from '../data/monedas';
import Error from './Error';

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

const Formulario = ({ setMonedas }) => {
  const [criptos, setCriptos] = useState([]);
  const [error, setError] = useState(false);

  const [monedas, SelectMoneda] = useSelectMoneda('Elije tu moneda', moneda);
  const [criptomoneda, SelectCriptomoneda] = useSelectMoneda(
    'Elije tu Criptomoneda',
    criptos
  );

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
