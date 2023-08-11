import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import Formulario from './components/Formulario';
import Resultado from './components/Resultado';
import Spinner from './components/Spinner';
import ImagenCripto from './img/imagen-criptos.png';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;

  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;

const Heading = styled.h1`
  color: #fff;
  text-align: center;
  font-weight: 700;
  font-size: 3.2rem;
  margin-top: 8rem;
  margin-bottom: 5rem;

  &::after {
    content: '';
    width: 10rem;
    height: 0.6rem;
    background-color: #007bff;
    display: block;
    margin: 1rem auto 0 auto;
  }
`;

function App() {
  const [moneda, setMonedas] = useState({});
  const [resultado, setResultado] = useState({});
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (Object.keys(moneda).length > 0) {
      const cortizarCripto = async () => {
        setLoader(true);
        setResultado({})
        const { monedas, criptomoneda } = moneda;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${monedas}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setResultado(resultado.DISPLAY[criptomoneda][monedas]);

        setLoader(false);
      };

      cortizarCripto();
    }
  }, [moneda]);

  return (
    <>
      <Contenedor>
        <Imagen src={ImagenCripto} alt="imagen criptomonedas" />

        <div>
          <Heading>Cotiza Criptomonedas al Instante</Heading>
          <Formulario setMonedas={setMonedas} />
          {loader && <Spinner />}
          {Object.keys(resultado).length > 0 && (
            <Resultado resultado={resultado} />
          )}
        </div>
      </Contenedor>
    </>
  );
}

export default App;
