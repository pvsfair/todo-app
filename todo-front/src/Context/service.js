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
  console.log('logging in');
  try {
    return await api.post('/login', { username, password }).then((response) => {
      return response.data;
    });
  } catch (err) {
    console.error(err.response.status, err.response.data);
    throw err;
  }
};

export const validateHash = async () => {
  console.log('validating hash');
  try {
    return await api.get('/validate').then((response) => {
      console.log(response.data);
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

export const sendTaskUpdate = (projectId, task) => {
  console.log('taskSent');
  return task;
};

// TODO: remove this when api is implemented
let projectCount = 4;
export const createProject = (projectName) => {
  console.log('creating project');
  return {
    id: projectCount++,
    userId: 1,
    projectName: projectName,
    tasks: [],
  };
};

// TODO: remove this when api is implemented
let taskCount = 10;
export const createTask = (projectId, taskName) => {
  console.log('creating task');
  return { id: taskCount++, taskName, done: false };
};
