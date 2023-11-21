import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <>
      <main className="container mx-auto p-5 md:flex md:justify-center md:items-center">
        <div className="">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
