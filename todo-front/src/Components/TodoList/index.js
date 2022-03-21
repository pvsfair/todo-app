import React, { useMemo } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import s from './styles.module.scss';
import { TrashIcon, PencilIcon } from '../../Assets';

function TodoList({ project }) {
  const doneTasks = useMemo(
    () => project.tasks.filter((task) => task.done),
    [project.tasks],
  );
  const todoTasks = useMemo(
    () => project.tasks.filter((task) => !task.done),
    [project.tasks],
  );

  const addNewTask = (projId, newTaskName) => {
    console.log(projId, newTaskName);
  };
  return (
    <div className={s.List}>
      <div className={s.ProjectHeader}>
        <span>{project.projectName}</span>
        <div className={s.Actions}>
          <PencilIcon />
          <TrashIcon />
        </div>
      </div>
      <div className={s.Content}>
        <h2>To Do</h2>
        {todoTasks.map((task) => (
          <TodoItem projectId={project.id} task={task} />
        ))}
        <h2>Done</h2>
        {doneTasks.map((task) => (
          <TodoItem projectId={project.id} task={task} />
        ))}
      </div>
      <hr />
      <TodoForm
        handleAdd={(taskName) => {
          return addNewTask(project.id, taskName);
        }}
      />
    </div>
  );
}

export default TodoList;
