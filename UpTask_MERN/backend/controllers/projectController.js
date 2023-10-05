import mongoose from 'mongoose';
import Project from '../models/Project.js';
import User from '../models/User.js';

// List all projects of auth users
/**
 * The function `getProjects` retrieves all projects created by the currently logged-in user and sends
 * them as a JSON response.
 * @param req - The `req` parameter is the request object, which contains information about the
 * incoming HTTP request, such as the request headers, request parameters, and request body.
 * @param res - The `res` parameter is the response object that is used to send a response back to the
 * client. It is an instance of the Express `Response` object and has methods like `json()` to send a
 * JSON response, `send()` to send a plain text response, and `status()` to
 */
const getProjects = async (req, res) => {
  const projects = await Project.find({
    $or: [{ collaborators: { $in: req.user } }, { creator: { $in: req.user } }],
  }).select('-tasks');
  res.json(projects);
};

// Create new projects
/**
 * The function `newProject` creates a new project, assigns the creator as the current user, saves the
 * project to the database, and returns the stored project as a JSON response.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as the request headers, request body, and request parameters. It is typically
 * provided by the web framework or server handling the request.
 * @param res - The `res` parameter is the response object that is used to send a response back to the
 * client. It is an instance of the Express `Response` object and has methods like `json()` to send a
 * JSON response, `send()` to send a plain text response, and `status()` to
 */
const newProject = async (req, res) => {
  const project = new Project(req.body);
  project.creator = req.user._id;

  try {
    const storeProject = await project.save();
    res.json(storeProject);
  } catch (error) {
    console.log(error);
  }
};

// List a project and task's
/**
 * The function `getProject` retrieves a project and its associated tasks based on the provided ID, and
 * checks if the user making the request is the creator of the project.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as the request headers, request parameters, request body, etc. It is used to
 * retrieve data from the client and pass it to the server.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code, headers, and sending the response body.
 * @returns a JSON response with the project and tasks.
 */
const getProject = async (req, res) => {
  const { id } = req.params;
  const validId = mongoose.Types.ObjectId.isValid(id);

  if (!validId) {
    const error = new Error('El Id ingresado no es correcto');
    return res.status(404).json({ msg: error.message });
  }

  const project = await Project.findById(id)
    .populate('tasks')
    .populate('collaborators', 'name email');

  if (!project) {
    const error = new Error('El proyecto solicitado no existe');
    return res.status(404).json({ msg: error.message });
  }

  if (
    project.creator.toString() !== req.user._id.toString() &&
    !project.collaborators.some(
      (collaborator) => collaborator._id.toString() === req.user._id.toString()
    )
  ) {
    const error = new Error('Acción no válida');
    return res.status(401).json({ msg: error.message });
  }
  // const tasks = await Task.find().where('project').equals(project._id);

  res.json(project);
};

// Allow edit a project
/**
 * The function `editProject` is an asynchronous function that edits a project based on the provided
 * ID, and returns the updated project.
 * @param req - The `req` parameter is the request object that contains information about the HTTP
 * request made by the client. It includes properties such as `params`, `body`, and `user`.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code, headers, and sending the response body. In this code, the `res` object is
 * used
 * @returns the updated project object if the update is successful.
 */
const editProject = async (req, res) => {
  const { id } = req.params;
  const validId = mongoose.Types.ObjectId.isValid(id);

  if (!validId) {
    const error = new Error('El Id ingresado no es correcto');
    return res.status(404).json({ msg: error.message });
  }

  const project = await Project.findById(id);

  if (!project) {
    const error = new Error('El proyecto solicitado no existe');
    return res.status(404).json({ msg: error.message });
  }

  if (project.creator.toString() !== req.user._id.toString()) {
    const error = new Error('Acción no válida');
    return res.status(401).json({ msg: error.message });
  }

  project.name = req.body.name || project.name;
  project.description = req.body.description || project.description;
  project.deadline = req.body.deadline || project.deadline;
  project.client = req.body.client || project.client;

  try {
    const storeProject = await project.save();
    res.json(storeProject);
  } catch (error) {
    console.log(error);
  }
};

// Delete
/**
 * The `deleteProject` function is an asynchronous function that deletes a project based on the
 * provided ID, after performing some validation checks.
 * @param req - The `req` parameter is the request object that contains information about the HTTP
 * request made by the client. It includes properties such as `params`, which contains route
 * parameters, `user`, which contains information about the authenticated user making the request, and
 * others like `body`, `query`, `headers`,
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code, sending JSON data, or redirecting the client to another URL.
 * @returns a JSON response with a message indicating whether the project was successfully deleted or
 * not.
 */
const deleteProject = async (req, res) => {
  const { id } = req.params;
  const validId = mongoose.Types.ObjectId.isValid(id);

  if (!validId) {
    const error = new Error('El Id ingresado no es correcto');
    return res.status(404).json({ msg: error.message });
  }

  const project = await Project.findById(id);

  if (!project) {
    const error = new Error('El proyecto solicitado no existe');
    return res.status(404).json({ msg: error.message });
  }

  if (project.creator.toString() !== req.user._id.toString()) {
    const error = new Error('Acción no válida');
    return res.status(401).json({ msg: error.message });
  }

  try {
    await project.deleteOne();
    res.json({ msg: 'Proyecto eliminado' });
  } catch (error) {
    console.log(error);
  }
};

// Search Collaborator
const searchCollaborator = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email }).select(
    '-confirmed -createdAt -password -token -updatedAt -__v'
  );

  if (!user) {
    const error = new Error('Usuario no encontrado');
    return res.status(404).json({ msg: error.message });
  }

  res.json(user);
};

// Add collaborator
const addCollaborator = async (req, res) => {
  const project = await Project.findById(req.params.id);

  // Check if project exist
  if (!project) {
    const error = new Error('No se encontró el proyecto');
    return res.status(404).json({ msg: error.message });
  }

  // Check if the user is the creator
  if (project.creator.toString() !== req.user._id.toString()) {
    const error = new Error('Acción no válida');
    return res.status(404).json({ msg: error.message });
  }

  // Select some data response
  const { email } = req.body;
  const user = await User.findOne({ email }).select(
    '-confirmed -createdAt -password -token -updatedAt -__v'
  );

  if (!user) {
    const error = new Error('Usuario no encontrado');
    return res.status(404).json({ msg: error.message });
  }

  // Check if the user does not an admin
  if (project.creator.toString() === user._id.toString()) {
    const error = new Error('El creador del proyecto no puede ser colaborador');
    return res.status(404).json({ msg: error.message });
  }

  // Check if the collaborator exists
  if (project.collaborators.includes(user._id)) {
    const error = new Error('El usuario ya es un colaborador');
    return res.status(404).json({ msg: error.message });
  }

  // Save collaborator
  project.collaborators.push(user._id);
  await project.save();
  res.json({ msg: 'Colaborador añadido correctamente' });
};

// Remove collaborator
const deleteCollaborator = async (req, res) => {
  const project = await Project.findById(req.params.id);

  // Check if project exist
  if (!project) {
    const error = new Error('No se encontró el proyecto');
    return res.status(404).json({ msg: error.message });
  }

  // Check if the user is the creator
  if (project.creator.toString() !== req.user._id.toString()) {
    const error = new Error('Acción no válida');
    return res.status(404).json({ msg: error.message });
  }

  // Delete collaborator
  project.collaborators.pull(req.body.id);

  await project.save();
  res.json({ msg: 'Colaborador eliminado correctamente' });
};

// List all project task's
// const getTasks = async (req, res) => {
//   const { id } = req.params;
//   const validId = mongoose.Types.ObjectId.isValid(id);

//   if (!validId) {
//     const error = new Error('El Id ingresado no es correcto');
//     return res.status(404).json({ msg: error.message });
//   }

//   const existproject = await Project.findById(id);

//   if (!existproject) {
//     const error = new Error('El proyecto solicitado no existe');
//     return res.status(404).json({ msg: error.message });
//   }

//   const tasks = await Task.find().where('project').equals(id);
//   res.json(tasks);
// };

export {
  getProjects,
  newProject,
  getProject,
  editProject,
  deleteProject,
  searchCollaborator,
  addCollaborator,
  deleteCollaborator,
  // getTasks,
};
