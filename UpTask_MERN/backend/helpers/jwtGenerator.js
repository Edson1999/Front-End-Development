import jwt from 'jsonwebtoken';

/**
 * The function `jwtGenerator` generates a JSON Web Token (JWT) with a given `id` and a secret key
 * stored in the environment variable `JWT_SECRET`, which expires after 30 days.
 * @param id - The `id` parameter is the unique identifier of the user for whom the JSON Web Token
 * (JWT) is being generated.
 * @returns The function `jwtGenerator` returns a JSON Web Token (JWT) that is generated using the
 * `jwt.sign` method.
 */
const jwtGenerator = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export default jwtGenerator;
