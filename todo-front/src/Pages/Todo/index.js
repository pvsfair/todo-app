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

function Todo() {
  const { state, dispatch } = useOrderCreationContext();

  const createProject = createCreateProject(dispatch);
  const deleteProject = createDeleteProject(state, dispatch);
  const updateProject = createUpdateProject(state, dispatch);

  const setTastTodoStatus = createSetTaskTodoStatus(state, dispatch);
  const createTask = createCreateTask(state, dispatch);
  const deleteTask = createDeleteTask(state, dispatch);
  const updateTaskName = createUpdateTaskName(state, dispatch);

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
