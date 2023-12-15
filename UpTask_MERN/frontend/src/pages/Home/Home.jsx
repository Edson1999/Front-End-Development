import GlobalCard from '../../components/Card/Card';
import useAuth from '../../hooks/useAuth';

function bodyContent(auth) {
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full h-full">
      <h1 className="text-5xl text-blue-700 font-normal text-center">
        ¡Bienvenido!
      </h1>
      <h1 className="text-4xl text-blue-900 font-normal text-center">
        {auth?.name}
      </h1>
      <p className="text-xl text-gray-500 font-normal text-center">
        Comienza a crear y administrar tus proyectos
      </p>
    </div>
  );
}

function footerContent() {
  return (
    <>
      <p className="text-xs">© 2023 UpTask Project, ISC Develop.</p>
    </>
  );
}

export const Home = () => {
  const { auth } = useAuth();
  return (
    <GlobalCard bodyText={bodyContent(auth)} footerText={footerContent()} />
  );
};

export default Home;
