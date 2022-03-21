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
