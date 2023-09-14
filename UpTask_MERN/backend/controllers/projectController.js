import Project from '../models/Project.js';
import mongoose from 'mongoose';

// List all projects of auth users
const getProjects = async (req, res) => {
  const projects = await Project.find().where('creator').equals(req.user);
  res.json(projects);
};

// Create new projects
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
const getProject = async (req, res) => {
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
  res.json(project);
};

// Allow edit a project
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

// Add collaborator
const addCollaborator = async (req, res) => {};

// Remove collaborator
const deleteCollaborator = async (req, res) => {};

// List all project task's
const getTasks = async (req, res) => {};

export {
  getProjects,
  newProject,
  getProject,
  editProject,
  deleteProject,
  addCollaborator,
  deleteCollaborator,
  getTasks,
};
