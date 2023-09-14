import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * The `checkAuth` function is a middleware that checks if a valid token is present in the request
 * headers and verifies it using a JWT secret, and then attaches the decoded user information to the
 * request object before passing it to the next middleware.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as headers, body, and query parameters. It is an object that is passed to the
 * middleware function by the Express framework.
 * @param res - The `res` parameter is the response object in Express.js. It is used to send the
 * response back to the client.
 * @param next - The `next` parameter is a callback function that is used to pass control to the next
 * middleware function in the request-response cycle. It is typically called at the end of the current
 * middleware function to indicate that it has completed its processing and the next middleware
 * function should be called.
 * @returns In the code provided, if the token is successfully decoded and the user is found, the
 * function will call the `next()` function, indicating that the authentication check was successful
 * and the request can proceed to the next middleware or route handler.
 */
const checkAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select(
        '-password -confirmed -token -createdAt -updatedAt -__v'
      );

      return next();
    } catch (error) {
      return res.status(404).json({ msg: 'Hubo un error' });
    }
  }
  if (!token) {
    const error = new Error('Token no válido');
    return res.status(401).json({ msg: error.message });
  }

  next();
};

export default checkAuth;
