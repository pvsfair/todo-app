import NewProjectForm from '../../Components/NewProjectForm';
import TodoList from '../../Components/TodoList';
import s from './styles.module.scss';
import { useOrderCreationContext } from '../../Context';
import {
  createCreateProject,
  createCreateTask,
  createDeleteProject,
  createDeleteTask,
  createSetTaskTodoStatus,
  createUpdateProject,
  createUpdateTaskName,
} from '../../Context/actions';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Todo() {
  const { state, dispatch } = useOrderCreationContext();
  const navigate = useNavigate();

  const createProject = createCreateProject(dispatch);
  const deleteProject = createDeleteProject(state, dispatch);
  const updateProject = createUpdateProject(state, dispatch);

  const setTastTodoStatus = createSetTaskTodoStatus(state, dispatch);
  const createTask = createCreateTask(state, dispatch);
  const deleteTask = createDeleteTask(state, dispatch);
  const updateTaskName = createUpdateTaskName(state, dispatch);

  useEffect(() => {
    if (!state.user.userHash) navigate('/');
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [state.user]);

  return (
    <div className={s.container}>
      {state.projects.map((project) => (
        <TodoList
          handleTodoClick={setTastTodoStatus}
          handleDeleteTaskClick={deleteTask}
          handleUpdateTaskNameClick={updateTaskName}
          handleAddTask={createTask}
          handleUpdateProject={updateProject}
          handleDeleteProject={deleteProject}
          key={project.id}
          project={project}
        />
      ))}
      <NewProjectForm handleNewProject={createProject} />
    </div>
  );
}

export default Todo;
