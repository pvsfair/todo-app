import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333/api',
  timeout: 10000,
  headers: {
    'content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const hash = getHashFromLocalStorage();
  if (hash) {
    config.headers.Authorization = hash;
  }
  return config;
});

export const login = async (username, password) => {
  try {
    return await api.post('/login', { username, password }).then((response) => {
      return response.data;
    });
  } catch (err) {
    console.error(err.response.status, err.response.data);
    throw err;
  }
};

export const logout = async () => {
  try {
    return await api.post('/logout').then((response) => {
      return response.data;
    });
  } catch (err) {
    console.error(err.response.status, err.response.data);
    throw err;
  }
};

export const register = async (username, realName, password) => {
  try {
    return await api
      .post('/register', { username, password, name: realName })
      .then((response) => {
        return response.data;
      });
  } catch (err) {
    console.error(err.response.status, err.response.data);
    throw err;
  }
};

export const validateHash = async () => {
  try {
    return await api.get('/validate').then((response) => {
      return response.data;
    });
  } catch (err) {
    console.error(err.response.status, err.response.data);
    throw err;
  }
};

export const listProjects = async () => {
  try {
    return await api.get('/projects').then((response) => {
      return response.data;
    });
  } catch (err) {
    console.error(err.response.status, err.response.data);
    throw err;
  }
};

export const saveHashOnLocalStorage = (hash) => {
  localStorage.setItem('userHash', hash);
};

export const getHashFromLocalStorage = () => {
  return localStorage.getItem('userHash');
};

export const sendTaskUpdate = async (projectId, task) => {
  try {
    return await api
      .put(`/projects/${projectId}/task/${task.id}`, {
        taskName: task.taskName,
        done: task.done,
      })
      .then((response) => {
        return response.data;
      });
  } catch (err) {
    console.error(err.response.status, err.response.data);
    throw err;
  }
};

export const createProject = async (projectName) => {
  try {
    return await api.post('/projects', { projectName }).then((response) => {
      return response.data;
    });
  } catch (err) {
    console.error(err.response.status, err.response.data);
    throw err;
  }
};

export const deleteProject = async (projectId) => {
  try {
    return await api.delete(`/projects/${projectId}`).then((response) => {
      return response.data;
    });
  } catch (err) {
    console.error(err.response.status, err.response.data);
    throw err;
  }
};

export const updateProject = async (projectId, projectName) => {
  try {
    return await api.put(`/projects/${projectId}`, { projectName }).then((response) => {
      return response.data;
    });
  } catch (err) {
    console.error(err.response.status, err.response.data);
    throw err;
  }
};

export const createTask = async (projectId, taskName) => {
  try {
    return await api
      .post(`/projects/${projectId}/task`, {
        taskName,
      })
      .then((response) => {
        return response.data;
      });
  } catch (err) {
    console.error(err.response.status, err.response.data);
    throw err;
  }
};

export const deleteTask = async (projectId, taskId) => {
  try {
    return await api
      .delete(`/projects/${projectId}/task/${taskId}`)
      .then((response) => {
        return response.data;
      });
  } catch (err) {
    console.error(err.response.status, err.response.data);
    throw err;
  }
};
