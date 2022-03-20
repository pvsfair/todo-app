import { NotFoundError } from './errors.js';

let projects = [
  {
    id: 1,
    userId: 1,
    projectName: 'proj 1',
    tasks: [
      { id: 1, taskName: 'task 1', done: true },
      { id: 2, taskName: 'task 2', done: false },
      { id: 3, taskName: 'task 3', done: false },
    ],
  },
  {
    id: 2,
    userId: 2,
    projectName: 'proj 1',
    tasks: [
      { id: 4, taskName: 'task 1', done: true },
      { id: 5, taskName: 'task 2', done: false },
      { id: 6, taskName: 'task 3', done: false },
    ],
  },
];

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
