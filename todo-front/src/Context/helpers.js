const initialValues = {
  loginError: false,
  user: {
    username: '',
    userHash: '',
    displayName: '',
  },
  projects: [
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
      projectName: 'proj 2',
      tasks: [
        { id: 4, taskName: 'task 4', done: true },
        { id: 5, taskName: 'task 5', done: false },
        { id: 6, taskName: 'task 6', done: false },
      ],
    },
    {
      id: 3,
      userId: 2,
      projectName: 'proj 3',
      tasks: [
        { id: 7, taskName: 'task 7', done: true },
        { id: 8, taskName: 'task 8', done: false },
        { id: 9, taskName: 'task 9', done: false },
      ],
    },
  ],
};

export { initialValues };
