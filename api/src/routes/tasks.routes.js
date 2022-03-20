import express from 'express';
import {} from '../controllers/projectControllers.js';
import {
  taskDelete,
  taskFind,
  taskList,
  taskSave,
  taskUpdate,
} from '../controllers/taskController.js';

const routes = express.Router({ mergeParams: true });

routes.get('/', taskList);
routes.get('/:taskId', taskFind);
routes.post('/', taskSave);
routes.put('/:taskId', taskUpdate);
routes.delete('/:taskId', taskDelete);

export default routes;
