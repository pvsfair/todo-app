import { Router } from 'express';
import {
  taskDelete,
  taskFind,
  taskList,
  taskSave,
  taskUpdate,
} from '../controllers/taskController.js';

const routes = Router({ mergeParams: true });

routes.get('/', taskList);
routes.get('/:taskId', taskFind);
routes.post('/', taskSave);
routes.put('/:taskId', taskUpdate);
routes.delete('/:taskId', taskDelete);

export default routes;
