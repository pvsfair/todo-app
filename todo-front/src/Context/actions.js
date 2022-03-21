import {
  createProject,
  createTask,
  login,
  saveHashOnLocalStorage,
  sendTaskUpdate,
  validateHash,
} from './service';
import { TodoAppActionTypes } from './types';

export function createGetProject(state) {
  return function (projectId) {
    return state.projects.find((project) => project.id === projectId);
  };
}

export function createCreateProject(dispatch) {
  return function (projectName) {
    const newProject = createProject(projectName);
    dispatch({
      type: TodoAppActionTypes.createProject,
      value: newProject,
    });
  };
}

export function createUpdateProject(state, dispatch) {
  return function (proejctId, newProjectName) {
    const getProject = createGetProject(state);
    const project = getProject(proejctId);
    project.projectName = newProjectName;

    dispatch({
      type: TodoAppActionTypes.setProjects,
      value: state.projects,
    });
  };
}

export function createDeleteProject(state, dispatch) {
  return function (proejctId) {
    const getProject = createGetProject(state);
    const project = getProject(proejctId);
    const projectIndex = state.projects.indexOf(project);
    state.projects.splice(projectIndex, 1);

    dispatch({
      type: TodoAppActionTypes.setProjects,
      value: state.projects,
    });
  };
}

export function createCreateTask(state, dispatch) {
  return function (projectId, taskName) {
    const newTask = createTask(projectId, taskName);
    const getProject = createGetProject(state);
    const project = getProject(projectId);
    project.tasks.push(newTask);
    dispatch({
      type: TodoAppActionTypes.setProjects,
      value: state.projects,
    });
  };
}

export function createDeleteTask(state, dispatch) {
  return function (projectId, taskId) {
    const getProject = createGetProject(state);
    const project = getProject(projectId);

    const taskFound = project.tasks.find((t) => t.id === taskId);

    const taskIndex = project.tasks.indexOf(taskFound);
    project.tasks.splice(taskIndex, 1);

    dispatch({
      type: TodoAppActionTypes.setProjects,
      value: state.projects,
    });
  };
}

export function createSetTaskTodoStatus(state, dispatch) {
  return function (projectId, task) {
    const getProject = createGetProject(state);
    const project = getProject(projectId);
    const taskFound = project.tasks.find((t) => t.id === task.id);
    taskFound.done = !taskFound.done;
    const taskUpdated = sendTaskUpdate(projectId, task);
    taskFound.taskName = taskUpdated.taskName;
    taskFound.done = taskUpdated.done;
    dispatch({
      type: TodoAppActionTypes.setProjects,
      value: state.projects,
    });
  };
}

export function createUpdateTaskName(state, dispatch) {
  return function (projectId, taskId, taskName) {
    const getProject = createGetProject(state);
    const project = getProject(projectId);

    const taskFound = project.tasks.find((t) => t.id === taskId);
    taskFound.taskName = taskName;
    const taskUpdated = sendTaskUpdate(projectId, taskFound);
    taskFound.taskName = taskUpdated.taskName;
    dispatch({
      type: TodoAppActionTypes.setProjects,
      value: state.projects,
    });
  };
}

export function createLogin(dispatch) {
  return function (username, password) {
    const setLoginError = createSetLoginError(dispatch);
    login(username, password)
      .then((user) => {
        setLoginError(false);
        saveHashOnLocalStorage(user.authHash.hash);
        dispatch({
          type: TodoAppActionTypes.setUser,
          value: {
            username: user.authHash.username,
            userHash: user.authHash.hash,
            displayName: user.authHash.name,
          },
        });
      })
      .catch((err) => {
        setLoginError(true);
        console.error(err);
      });
  };
}

export function createSetLoginError(dispatch) {
  return function (loginError) {
    dispatch({
      type: TodoAppActionTypes.setLoginError,
      value: loginError,
    });
  };
}

export function createValidateHash(dispatch) {
  return function (hash) {
    const setLoginError = createSetLoginError(dispatch);
    console.log(12123);
    validateHash()
      .then((userData) => {
        setLoginError(false);
        dispatch({
          type: TodoAppActionTypes.setUser,
          value: {
            username: userData.username,
            userHash: hash,
            displayName: userData.name,
          },
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
}
