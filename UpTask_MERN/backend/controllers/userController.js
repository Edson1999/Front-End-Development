import User from '../models/Usuario.js';
import idGenerator from '../helpers/idGenerator.js';
import jwtGenerator from '../helpers/jwtGenerator.js';

/**
 * The function `register` checks if a user with the given email already exists, and if not, it creates
 * a new user and saves it to the database.
 * @param req - The `req` parameter is the request object that contains information about the HTTP
 * request made by the client. It includes properties such as the request headers, request body,
 * request method, request URL, etc. In this code snippet, `req.body` is used to access the request
 * body, which is
 * @param res - The `res` parameter is the response object that is used to send a response back to the
 * client. It is an instance of the Express `Response` object and provides methods for sending various
 * types of responses such as JSON, HTML, or plain text.
 */
const register = async (req, res) => {
  // Evitar registros duplicados
  const { email } = req.body;
  const userExist = await User.findOne({ email });

  if (userExist) {
    const error = new Error('Usuario ya registrado');
    res.status(400).json({ msg: error.message });
  }

  try {
    const user = new User(req.body);
    user.token = idGenerator();
    const storeUser = await user.save();
    res.json(storeUser);
  } catch (error) {
    console.log(error);
  }
};

/**
 * The function `auth` is an asynchronous function that handles user authentication by checking if the
 * user exists, if the user is confirmed, and if the password is correct.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as the request headers, request body, and request parameters. It is typically
 * provided by the web framework or server handling the request.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code, sending JSON data, or redirecting the client to another URL.
 */
const auth = async (req, res) => {
  const { email, password } = req.body;

  // Check if user exist
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error('El usuario no existe');
    res.status(404).json({ msg: error.message });
  }

  // Check if user confirmed
  if (!user?.confirmed) {
    const error = new Error('El usuario no está validado');
    res.status(403).json({ msg: error.message });
  }

  // Check user password
  if (await user.checkPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: jwtGenerator(user._id),
    });
  } else {
    const error = new Error('El password es incorrecto');
    res.status(403).json({ msg: error.message });
  }
};

/**
 * The function confirms a user by finding them using a token, updating their confirmed status and
 * token, and sending a response.
 * @param req - The `req` parameter is the request object that contains information about the HTTP
 * request made by the client. It includes properties such as the request method, request headers,
 * request parameters, request body, etc. In this case, `req.params` is an object that contains the
 * route parameters extracted from the
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It is an instance of the Express `Response` object.
 */
const confirm = async (req, res) => {
  const { token } = req.params;
  const confirmUser = await User.findOne({ token });

  if (!confirmUser) {
    const error = new Error('Token no válido');
    res.status(403).json({ msg: error.message });
  }

  try {
    confirmUser.confirmed = true;
    confirmUser.token = '';
    await confirmUser.save();
    res.json({ msg: 'Usuario confirmado correctamente' });
  } catch (error) {
    console.log(error);
  }
};

/**
 * The `forgotPassword` function is an asynchronous function that handles the logic for generating a
 * token and sending an email with instructions for resetting a user's password.
 * @param req - The `req` parameter is the request object, which contains information about the
 * incoming HTTP request, such as the request headers, request body, and request parameters. It is used
 * to retrieve data sent by the client.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code, headers, and sending the response body.
 */
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error('El usuario no existe');
    res.status(404).json({ msg: error.message });
  }

  try {
    user.token = idGenerator();
    await user.save();
    res.json({ msg: 'Hemos enviado un email con las instrucciones' });
  } catch (error) {
    console.log(error);
  }
};

/**
 * The function checks if a token is valid and if the corresponding user exists.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as the request headers, request parameters, request body, etc. In this case, it
 * is used to extract the `token` parameter from the request URL.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code, headers, and sending the response body.
 */
const checkToken = async (req, res) => {
  const { token } = req.params;
  const validToken = await User.findOne({ token });

  if (validToken) {
    res.json({ msg: 'Token válido y el usuario existe' });
  } else {
    const error = new Error('El token no es válido');
    res.status(404).json({ msg: error.message });
  }
};

/**
 * The function `newPassword` is an asynchronous function that takes in a request and response object,
 * retrieves a token and password from the request, finds a user with the given token, updates the
 * user's password and token, and sends a response with a success message if the user is found and the
 * password is successfully updated, or sends an error message if the token is invalid.
 * @param req - The `req` parameter is an object that represents the HTTP request made to the server.
 * It contains information about the request such as the request method, request headers, request body,
 * request parameters, etc.
 * @param res - The `res` parameter is the response object that is used to send a response back to the
 * client. It contains methods and properties that allow you to control the response, such as setting
 * the status code, headers, and sending the response body.
 */
const newPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({ token });

  if (user) {
    user.password = password;
    user.token = '';

    try {
      await user.save();
      res.json({ msg: 'Password modificado correctamente' });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error('El token no es válido');
    res.status(404).json({ msg: error.message });
  }
};

/**
 * The profile function is an asynchronous function that takes a request and response object as
 * parameters and returns the user object as a JSON response.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as the request headers, request body, and request parameters. It is typically
 * provided by the web framework or server that is handling the request.
 * @param res - The `res` parameter is the response object that is used to send a response back to the
 * client. It has methods like `json()` that can be used to send a JSON response, `send()` to send a
 * plain text response, and `status()` to set the status code of the response
 */
const profile = async (req, res) => {
  const { user } = req;
  res.json(user);
};

export {
  register,
  auth,
  confirm,
  forgotPassword,
  checkToken,
  newPassword,
  profile,
};
