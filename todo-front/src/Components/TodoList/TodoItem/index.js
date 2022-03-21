import React, { useState } from 'react';
import { PencilIcon, TrashIcon } from '../../../Assets';
import s from './styles.module.scss';

function TodoItem({ handleTaskClick, handleDeleteTask, handleUpdateTaskName, task }) {
  const [edittingTask, setEdittingTask] = useState(false);
  const [taskName, setTaskName] = useState(task.taskName);

  const deleteClick = (e) => {
    e.stopPropagation();
    handleDeleteTask(task.id);
  };

  const handleUpdateName = () => {
    handleUpdateTaskName(task.id, taskName);
    setEdittingTask(false);
  };

  const editClick = (e) => {
    e.stopPropagation();
    setEdittingTask(true);
  };

  const handleCancelEditTaskName = () => {
    setTaskName(task.taskName);
    setEdittingTask(false);
  };

  const formatDate = (date) => {
    return date.toLocaleString();
  };

  return (
    <div className={s.Item} onClick={() => handleTaskClick(task)}>
      <input id={task.id} type="checkbox" checked={task.done} readOnly />
      {edittingTask ? (
        <input
          autoFocus
          type="text"
          onChange={(e) => setTaskName(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleUpdateName();
          }}
          onBlur={handleCancelEditTaskName}
          value={taskName}
          onFocus={(e) => e.target.select()}
        />
      ) : (
        <span> {task.taskName}</span>
      )}
      {!task.done && (
        <span className={s.Actions}>
          {!edittingTask && <PencilIcon onClick={editClick} />}
          <TrashIcon onClick={deleteClick} />
        </span>
      )}
      {task.done && (
        <div className={s.Tooltip}>{formatDate(new Date(task.finishedAt))}</div>
      )}
    </div>
  );
}

export default TodoItem;
