import { NotFoundError } from '../repository/errors.js';
import taskRepo from '../repository/task_local.js';
import { validateTask, validateTaskUpdate } from '../validators/task.js';

export const taskList = (req, res) => {
  const parsedProjId = parseInt(req.params.projId);

  if (!parsedProjId) return res.sendStatus(400);

  try {
    const tasks = taskRepo.list(parsedProjId, req.user.id);
    return res.json(tasks);
  } catch (err) {
    if (err instanceof NotFoundError) return res.status(404).send(err.message);
    return res.status(400).send(err);
  }
};

export const taskFind = (req, res) => {
  const parsedProjId = parseInt(req.params.projId);
  const parsedTaskId = parseInt(req.params.taskId);

  if (!parsedProjId || !parsedTaskId) return res.sendStatus(400);

  try {
    const task = taskRepo.find(parsedProjId, parsedTaskId, req.user.id);
    return res.json(task);
  } catch (err) {
    if (err instanceof NotFoundError) return res.status(404).send(err.message);
    return res.status(400).send(err);
  }
};

export const taskSave = (req, res) => {
  const data = req.body;
  const parsedProjId = parseInt(req.params.projId);

  if (!parsedProjId) return res.sendStatus(400);

  try {
    validateTask(data);
  } catch (err) {
    return res.status(400).send(err);
  }

  try {
    const task = taskRepo.create(parsedProjId, data, req.user.id);
    return res.json(task);
  } catch (err) {
    if (err instanceof NotFoundError) return res.status(404).send(err.message);
    return res.status(400).send(err);
  }
};

export const taskUpdate = (req, res) => {
  const data = req.body;
  const parsedProjId = parseInt(req.params.projId);
  const parsedTaskId = parseInt(req.params.taskId);

  if (!parsedProjId || !parsedTaskId) return res.sendStatus(400);

  try {
    validateTaskUpdate(data);
  } catch (err) {
    return res.status(400).send(err);
  }

  try {
    const task = taskRepo.update(parsedProjId, parsedTaskId, data, req.user.id);
    return res.json(task);
  } catch (err) {
    if (err instanceof NotFoundError) return res.status(404).send(err.message);
    return res.status(400).send(err);
  }
};

export const taskDelete = (req, res) => {
  const parsedProjId = parseInt(req.params.projId);
  const parsedTaskId = parseInt(req.params.taskId);

  if (!parsedProjId || !parsedTaskId) return res.sendStatus(400);

  try {
    const task = taskRepo.delete(parsedProjId, parsedTaskId, req.user.id);
    return res.json(task);
  } catch (err) {
    if (err instanceof NotFoundError) return res.status(404).send(err.message);
    return res.status(400).send(err);
  }
};
