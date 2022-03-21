import { NotFoundError } from './errors.js';

let projects = [];

function listProjects(userId) {
  if (userId) return projects.filter((proj) => proj.userId === userId);
  return projects;
}

function getProject(id, userId) {
  const projs = listProjects(userId);

  const proj = projs.find((proj) => proj.id === id);

  if (!proj) throw new NotFoundError('Project', id);
  return proj;
}

function createProject(data, userId = 1) {
  const newProj = {
    id: projects.length + 1,
    userId,
    ...data,
    tasks: [],
  };
  projects.push(newProj);
  return newProj;
}

function updatePoject(id, updatedData, userId) {
  const foundProject = getProject(id, userId);
  foundProject.projectName = updatedData.projectName;
  return foundProject;
}

function deleteProject(id, userId) {
  const foundProject = getProject(id, userId);
  const index = projects.indexOf(foundProject);
  projects.splice(index, 1);
  return foundProject;
}

export default {
  list: listProjects,
  find: getProject,
  create: createProject,
  update: updatePoject,
  delete: deleteProject,
};
