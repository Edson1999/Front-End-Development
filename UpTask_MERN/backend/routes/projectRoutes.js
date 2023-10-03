import express from 'express';
import {
  getProjects,
  newProject,
  getProject,
  editProject,
  deleteProject,
  searchCollaborator,
  addCollaborator,
  deleteCollaborator,
  // getTasks,
} from '../controllers/projectController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router.route('/').get(checkAuth, getProjects).post(checkAuth, newProject);
router
  .route('/:id')
  .get(checkAuth, getProject)
  .put(checkAuth, editProject)
  .delete(checkAuth, deleteProject);

// router.get('/tasks/:id', checkAuth, getTasks);
router.post('/search-collaborator', checkAuth, searchCollaborator);
router.post('/add-collaborator/:id', checkAuth, addCollaborator);
router.delete('/delete-collaborator/:id', checkAuth, deleteCollaborator);

export default router;
