import express from 'express';
import {
  projectList,
  projectGet,
  projectSave,
  projectUpdate,
  projectDelete,
} from '../controllers/projectControllers.js';

const routes = express.Router();

routes.get('/', projectList);
routes.get('/:id', projectGet);
routes.post('/', projectSave);
routes.put('/:id', projectUpdate);
routes.delete('/:id', projectDelete);

export default routes;
