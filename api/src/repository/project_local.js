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
      { id: 1, taskName: 'task 1', done: true },
      { id: 2, taskName: 'task 2', done: false },
      { id: 3, taskName: 'task 3', done: false },
    ],
  },
];

function listProjects(userId) {
  if (userId) return projects.filter((proj) => proj.userId === userId);
  return projects;
}

function getProject(id, userId) {
  let proj = undefined;
  if (userId) {
    const projs = projects.filter((proj) => proj.userId === userId);
    proj = projs.find((proj) => proj.id === id);
  }
  proj = projects.find((proj) => proj.id === id);
  if (!proj) throw new NotFoundError('Project', id);
  return proj;
}

function createProject(data) {
  const newProj = {
    id: projects.length + 1,
    ...data,
    tasks: [],
  };
  projects.push(newProj);
  return newProj;
}

function updatePoject(id, updatedData) {
  const foundProject = getProject(id);
  foundProject.projectName = updatedData.projectName;
  return foundProject;
}

function deleteProject(id) {
  const foundProject = getProject(id);
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
