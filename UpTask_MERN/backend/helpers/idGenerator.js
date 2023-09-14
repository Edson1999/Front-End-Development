/**
 * The idGenerator function generates a unique ID by combining a random string and the current date.
 * @returns The function `idGenerator` returns a string that is a combination of a random string
 * generated using `Math.random()` and the current timestamp converted to a string using `Date.now()`.
 */
const idGenerator = () => {
  const random = Math.random().toString(32).substring(2);
  const date = Date.now().toString(32);

  return random + date;
};

export default idGenerator;
