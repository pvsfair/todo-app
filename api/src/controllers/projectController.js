import { NotFoundError } from '../repository/errors.js';
import projectRepo from '../repository/project_local.js';
import { validateProject } from '../validators/project.js';

export const projectList = (req, res) => {
  const projs = projectRepo.list(req.user.id);
  return res.json(projs);
};

export const projectGet = (req, res) => {
  const idParsed = parseInt(req.params.id);
  if (!idParsed) {
    return res.sendStatus(400);
  }
  try {
    const proj = projectRepo.find(idParsed, req.user.id);
    return res.json(proj);
  } catch (err) {
    if (err instanceof NotFoundError) return res.status(404).send(err.message);
    return res.status(400).send(err);
  }
};

export const projectSave = (req, res) => {
  const data = req.body;
  try {
    validateProject(data);
  } catch (err) {
    return res.status(400).send(err);
  }
  const newProj = projectRepo.create(data, req.user.id);
  return res.json(newProj);
};

export const projectUpdate = (req, res) => {
  const data = req.body;
  const idParsed = parseInt(req.params.id);
  if (!idParsed) {
    return res.sendStatus(400);
  }

  try {
    validateProject(data);
  } catch (err) {
    return res.status(400).send(err);
  }

  try {
    const updatedProj = projectRepo.update(idParsed, data, req.user.id);
    return res.json(updatedProj);
  } catch (err) {
    if (err instanceof NotFoundError) return res.status(404).send(err.message);
    return res.status(400).send(err);
  }
};

export const projectDelete = (req, res) => {
  const idParsed = parseInt(req.params.id);
  if (!idParsed) {
    return res.sendStatus(400);
  }

  try {
    const proj = projectRepo.delete(idParsed, req.user.id);
    return res.json(proj);
  } catch (err) {
    if (err instanceof NotFoundError) return res.status(404).send(err.message);
    return res.status(400).send(err);
  }
};
