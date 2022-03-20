import { NotFoundError } from './errors.js';
import projectsRepo from './project_local.js';

function totalTasksAmount() {
  const projs = projectsRepo.list();
  return projs.reduce((acc, curr, idx) => {
    return acc + curr.tasks.length;
  }, 0);
}

function listTasks(projId, userId) {
  const project = projectsRepo.find(projId, userId);
  return project.tasks;
}

function getTask(projId, taskId, userId) {
  const tasks = listTasks(projId, userId);

  const task = tasks.find((task) => task.id === taskId);
  if (!task) throw new NotFoundError('Task', taskId);
  return task;
}

function createTask(projId, data, userId) {
  const newTask = {
    id: totalTasksAmount() + 1,
    ...data,
    done: false,
  };
  const tasks = listTasks(projId, userId);
  tasks.push(newTask);
  return newTask;
}

function updateTask(projId, taskId, updatedData) {
  const foundTask = getTask(projId, taskId);

  foundTask.taskName = updatedData.taskName;
  return foundTask;
}

function deleteTask(projId, taskId, userId) {
  const foundProject = projectsRepo.find(projId);
  const foundTask = getTask(projId, taskId, userId);
  const index = foundProject.tasks.indexOf(foundTask);
  foundProject.tasks.splice(index, 1);
  return foundTask;
}

export default {
  list: listTasks,
  find: getTask,
  create: createTask,
  update: updateTask,
  delete: deleteTask,
};
