import Project from '../models/Project.js';
import Task from '../models/Task.js';

/**
 * The `addTask` function checks if a project exists and if the user has permission to add tasks, and
 * then creates a new task and returns it as a response.
 * @param req - The `req` parameter is the request object that contains information about the HTTP
 * request made by the client. It includes properties such as `body`, `params`, `query`, `headers`,
 * etc. In this code snippet, `req.body` is used to access the request body, which typically contains
 * @param res - The `res` parameter is the response object that is used to send a response back to the
 * client. It is an instance of the Express `Response` object.
 */
const addTask = async (req, res) => {
  const { project } = req.body;

  const projectExist = await Project.findById(project);

  if (!projectExist) {
    const error = new Error('No se encontró el proyecto');
    res.status(404).json({ msg: error.message });
  }
  if (projectExist.creator.toString() !== req.user._id.toString()) {
    const error = new Error('No tienes los permisos para añadir tareas');
    res.status(404).json({ msg: error.message });
  }

  try {
    const storeTask = await Task.create(req.body);
    // Add Project ID
    projectExist.tasks.push(storeTask._id);
    await projectExist.save();
    res.json(storeTask);
  } catch (error) {
    console.log(error);
  }
};

/**
 * The function `getTask` retrieves a task by its ID, checks if the task exists and if the user has
 * permission to access it, and returns the task if successful.
 * @param req - The `req` parameter is the request object, which contains information about the
 * incoming HTTP request, such as the request headers, request parameters, request body, etc. In this
 * case, it is used to extract the `id` parameter from the request URL.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code, sending JSON data, or redirecting the client to another URL.
 */
const getTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id).populate('project');

  if (!task) {
    const error = new Error('Tarea no encontrada');
    res.status(404).json({ msg: error.message });
  }

  if (task.project.creator.toString() !== req.user._id.toString()) {
    const error = new Error('Acción no permitida');
    res.status(403).json({ msg: error.message });
  }

  res.json(task);
};

/**
 * The function `updateTask` updates a task with the provided ID, checking if the task exists and if
 * the user has permission to update it.
 * @param req - The `req` parameter is the request object that contains information about the HTTP
 * request made by the client. It includes properties such as `params`, `body`, and `user`.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It is an object that contains methods and properties for handling the response, such as
 * `status`, `json`, and `send`.
 */
const updateTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id).populate('project');

  if (!task) {
    const error = new Error('Tarea no encontrada');
    res.status(404).json({ msg: error.message });
  }

  if (task.project.creator.toString() !== req.user._id.toString()) {
    const error = new Error('Acción no permitida');
    res.status(403).json({ msg: error.message });
  }

  task.name = req.body.name || task.name;
  task.description = req.body.description || task.description;
  task.priority = req.body.priority || task.priority;
  task.deadline = req.body.deadline || task.deadline;

  try {
    const storeTask = await task.save();
    res.json(storeTask);
  } catch (error) {
    console.log(error);
  }
};

/**
 * The `deleteTask` function deletes a task from the database if the task exists and the user making
 * the request is the creator of the project associated with the task.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as the request headers, request parameters, request body, etc. It is used to
 * retrieve data from the client and pass it to the server.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It is an instance of the Express `Response` object and provides methods for sending
 * various types of responses, such as JSON, HTML, or plain text. In this code, it is used to
 */
const deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id).populate('project');

  if (!task) {
    const error = new Error('Tarea no encontrada');
    res.status(404).json({ msg: error.message });
  }

  if (task.project.creator.toString() !== req.user._id.toString()) {
    const error = new Error('Acción no permitida');
    res.status(403).json({ msg: error.message });
  }

  try {
    await task.deleteOne();
    res.json({ msg: 'Tarea Eliminada' });
  } catch (error) {
    console.log(error);
  }
};

/**
 * The function "changeStateTask" is an asynchronous function that takes in a request and response
 * object as parameters.
 * @param req - The `req` parameter is an object that represents the HTTP request made by the client.
 * It contains information such as the request method, headers, URL, and any data sent in the request
 * body.
 * @param res - The `res` parameter is the response object that is used to send a response back to the
 * client. It contains methods and properties that allow you to set the status code, headers, and send
 * the response body.
 */
const changeStateTask = async (req, res) => {};

export { addTask, getTask, updateTask, deleteTask, changeStateTask };
