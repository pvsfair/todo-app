import React, { useState } from 'react';
import s from './styles.module.scss';

function TodoForm({ handleAdd }) {
  const [newTaskName, setNewTaskName] = useState('');
  const handleSubmit = () => {
    if (!newTaskName) return;
    handleAdd(newTaskName);
    setNewTaskName('');
  };
  return (
    <div className={s.Form}>
      <input
        placeholder="Task"
        type="text"
        onChange={(e) => {
          setNewTaskName(e.target.value);
        }}
        value={newTaskName}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            e.stopPropagation();
            handleSubmit();
          }
        }}
      />
      <button
        onClick={() => {
          handleSubmit();
        }}
      >
        Add
      </button>
    </div>
  );
}

export default TodoForm;
