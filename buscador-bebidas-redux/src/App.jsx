import { Container } from 'react-bootstrap';
import Formulario from './components/Formulario';
import ListadoBebidas from './components/ListadoBebidas';

/**
 * The App function returns a React component that renders a header with a title and a container with a
 * form and a list of drinks.
 * @returns The App component is returning a JSX fragment containing a header element with a title, a
 * Container component with a Formulario component and a ListadoBebidas component.
 */
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
