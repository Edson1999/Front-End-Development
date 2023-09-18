export const NewPassword = () => {
  return (
    <>
      <h1 className="text-blue-600 font-black text-5xl capitalize mt-8">
        Restablecer tú password
      </h1>
      <form className="my-8 bg-white shadow rounded-3xl py-2 px-4">
        <div className="my-5">
          <label htmlFor="password" className="text-gray-600 block font-bold">
            Nuevo Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Ingresa tú nuevo Password"
            className="w-full mt-2 py-2 px-4 rounded-3xl border bg-gray-100"
          />
        </div>
        <input
          type="submit"
          value="Establecer nuevo password"
          className="w-full my-2 py-2 px-4 rounded-3xl border bg-blue-600 text-white hover:cursor-pointer hover:bg-blue-800 transition-colors"
        />
      </form>
    </>
  );
};

export default NewPassword;
