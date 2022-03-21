import React from 'react';
import s from './styles.module.scss';

function TodoItem({ projectId, task }) {
  const handleClick = (task) => {
    console.log(`project ${projectId} click on Task: `, task);
  };
  return (
    <div className={s.Item} onClick={() => handleClick(task)}>
      <input id={task.id} type="checkbox" checked={task.done} />
      <span> {task.taskName}</span>
    </div>
  );
}

export default TodoItem;
