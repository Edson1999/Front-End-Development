import Project from '../models/Project.js';
import Task from '../models/Task.js';

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
    res.json(storeTask);
  } catch (error) {
    console.log(error);
  }
};

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

const changeStateTask = async (req, res) => {};

export { addTask, getTask, updateTask, deleteTask, changeStateTask };
