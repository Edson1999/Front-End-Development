import { Container } from 'react-bootstrap';
import Formulario from './components/Formulario';
import ListadoBebidas from './components/ListadoBebidas';

function App() {
  return (
    <>
      <header className="py-4">
        <h1>Buscador de Bebidas</h1>
      </header>
      <Container className="mt-4 bg-container">
        <Formulario />
        <ListadoBebidas />
      </Container>
    </>
  );
}

export default App;
