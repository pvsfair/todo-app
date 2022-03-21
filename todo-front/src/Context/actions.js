import {
  createProject,
  createTask,
  deleteProject,
  deleteTask,
  listProjects,
  login,
  saveHashOnLocalStorage,
  sendTaskUpdate,
  updateProject,
  validateHash,
} from './service';
import { TodoAppActionTypes } from './types';

export function createGetProject(state) {
  return function (projectId) {
    return state.projects.find((project) => project.id === projectId);
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

export function createLogin(dispatch) {
  const setLoginError = createSetLoginError(dispatch);
  return function (username, password) {
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

export function createValidateHash(dispatch) {
  const setLoginError = createSetLoginError(dispatch);
  return function (hash) {
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

export function createListProjects(dispatch) {
  return function () {
    listProjects()
      .then((projects) => {
        dispatch({
          type: TodoAppActionTypes.setProjects,
          value: projects,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function createCreateProject(dispatch) {
  return function (projectName) {
    createProject(projectName)
      .then((newProject) => {
        dispatch({
          type: TodoAppActionTypes.createProject,
          value: newProject,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function createDeleteProject(state, dispatch) {
  const listProjects = createListProjects(dispatch);
  return function (projectId) {
    deleteProject(projectId)
      .then(() => {
        listProjects();
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function createUpdateProject(state, dispatch) {
  const getProject = createGetProject(state);
  return function (projectId, newProjectName) {
    updateProject(projectId, newProjectName)
      .then((updatedProject) => {
        const project = getProject(updatedProject.id);
        project.projectName = updatedProject.projectName;

        dispatch({
          type: TodoAppActionTypes.setProjects,
          value: state.projects,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function createSetTaskTodoStatus(state, dispatch) {
  const getProject = createGetProject(state);
  return function (projectId, task) {
    const project = getProject(projectId);
    const taskFound = project.tasks.find((t) => t.id === task.id);
    taskFound.done = !taskFound.done;

    sendTaskUpdate(projectId, taskFound)
      .then((taskUpdated) => {
        taskFound.taskName = taskUpdated.taskName;
        taskFound.done = taskUpdated.done;

        dispatch({
          type: TodoAppActionTypes.setProjects,
          value: state.projects,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function createCreateTask(state, dispatch) {
  const getProject = createGetProject(state);
  return function (projectId, taskName) {
    createTask(projectId, taskName)
      .then((newTask) => {
        const project = getProject(projectId);
        project.tasks.push(newTask);
        dispatch({
          type: TodoAppActionTypes.setProjects,
          value: state.projects,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function createDeleteTask(state, dispatch) {
  const listProjects = createListProjects(dispatch);
  return function (projectId, taskId) {
    deleteTask(projectId, taskId)
      .then(() => {
        listProjects();
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function createUpdateTaskName(state, dispatch) {
  const getProject = createGetProject(state);
  return function (projectId, taskId, taskName) {
    const project = getProject(projectId);

    const taskFound = project.tasks.find((t) => t.id === taskId);
    taskFound.taskName = taskName;
    sendTaskUpdate(projectId, taskFound)
      .then((taskUpdated) => {
        taskFound.taskName = taskUpdated.taskName;
        taskFound.done = taskUpdated.done;

        dispatch({
          type: TodoAppActionTypes.setProjects,
          value: state.projects,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
}
