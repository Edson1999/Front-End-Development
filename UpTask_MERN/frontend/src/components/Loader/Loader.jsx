import { Spinner } from '@nextui-org/react';

const Loader = () => {
  return (
    <div className="container h-full mx-auto p-5 md:flex md:justify-center md:items-center">
      <Spinner label="Cargando..." color="Primary" labelColor="foreground" />
    </div>
  );
};

export default Loader;
