/**
 * The `Header` function returns a React component that displays a heading for a veterinary patient
 * tracking system.
 * @returns The Header component is returning a JSX element that consists of a heading element (h1)
 * with a class name of "font-black text-5xl text-center md:w-2/3 mx-auto". The heading element
 * contains the text "Seguimiento Pacientes" followed by a span element with a class name of
 * "text-indigo-600" and the text "Veterinaria".
 */
function Header() {
  return (
    <>
      <h1 className="font-black text-5xl text-center md:w-2/3 mx-auto">
        Seguimiento Pacientes{' '}
        <span className="text-indigo-600">Veterinaria</span>
      </h1>
    </>
  );
}

export default Header;
