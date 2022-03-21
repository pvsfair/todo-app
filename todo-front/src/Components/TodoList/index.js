import React, { useState } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import s from './styles.module.scss';
import { TrashIcon, PencilIcon } from '../../Assets';

function TodoList({
  handleUpdateProject,
  handleDeleteProject,
  handleTodoClick,
  handleDeleteTaskClick,
  handleUpdateTaskNameClick,
  handleAddTask,
  project,
}) {
  const [editingProjectName, setEditingProjectName] = useState(false);
  const [projectName, setProjectName] = useState(project.projectName);

  const doneTasks = project.tasks.filter((task) => task.done);
  const todoTasks = project.tasks.filter((task) => !task.done);

  const handleUpdateName = () => {
    handleUpdateProject(project.id, projectName);
    setEditingProjectName(false);
  };
  const handleEditProjectName = () => {
    setEditingProjectName(true);
  };
  const handleCancelEditProjectName = () => {
    setProjectName(project.projectName);
    setEditingProjectName(false);
  };
  return (
    <div className={s.List}>
      <div className={s.ProjectHeader}>
        {editingProjectName ? (
          <input
            autoFocus
            type="text"
            onChange={(e) => setProjectName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleUpdateName();
            }}
            onBlur={handleCancelEditProjectName}
            value={projectName}
            onFocus={(e) => e.target.select()}
          />
        ) : (
          <span onDoubleClick={handleEditProjectName}>{project.projectName}</span>
        )}
        <div className={s.Actions}>
          {!editingProjectName && <PencilIcon onClick={handleEditProjectName} />}
          <TrashIcon onClick={() => handleDeleteProject(project.id)} />
        </div>
      </div>
      <div className={s.Content}>
        <h2>To Do</h2>
        {todoTasks.map((task) => (
          <TodoItem
            handleTaskClick={(task) => handleTodoClick(project.id, task)}
            handleDeleteTask={(taskId) => handleDeleteTaskClick(project.id, taskId)}
            handleUpdateTaskName={(taskId, taskName) =>
              handleUpdateTaskNameClick(project.id, taskId, taskName)
            }
            key={task.id}
            task={task}
          />
        ))}
        <h2>Done</h2>
        {doneTasks.map((task) => (
          <TodoItem
            handleTaskClick={(task) => handleTodoClick(project.id, task)}
            handleDeleteTask={(taskId) => handleDeleteTaskClick(project.id, taskId)}
            handleUpdateTaskName={(taskId, taskName) =>
              handleUpdateTaskNameClick(project.id, taskId, taskName)
            }
            key={task.id}
            task={task}
          />
        ))}
      </div>
      <hr />
      <TodoForm
        handleAdd={(taskName) => {
          return handleAddTask(project.id, taskName);
        }}
      />
    </div>
  );
}

export default TodoList;
