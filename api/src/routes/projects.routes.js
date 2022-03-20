import { Router } from 'express';
import {
  projectList,
  projectGet,
  projectSave,
  projectUpdate,
  projectDelete,
} from '../controllers/projectController.js';

const routes = Router();

routes.get('/', projectList);
routes.get('/:id', projectGet);
routes.post('/', projectSave);
routes.put('/:id', projectUpdate);
routes.delete('/:id', projectDelete);

export default routes;
