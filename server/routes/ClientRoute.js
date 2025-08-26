import express from 'express';
import {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
  addProjectToClient,
  updateClientProject,
  deleteClientProject,
  getClientProjectById,
  getDueFollowUps
} from '../controllers/ClientController.js';
import {requireAuth} from '../middleware/auth.js'

const router = express.Router();

// Client routes
router.post('/', createClient);
router.get('/',  getAllClients);
router.get('/:id', getClientById);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

// Project (nested inside client)
router.post('/:clientId/projects', addProjectToClient);
router.get('/:clientId/projects/:projectId', getClientProjectById);
router.put('/:clientId/projects/:projectId', updateClientProject);
router.delete('/:clientId/projects/:projectId', deleteClientProject);

router.get('/follow-ups/due', getDueFollowUps);

export default router;
