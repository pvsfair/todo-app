import React, { useState } from 'react';
import s from './styles.module.scss';

function TodoForm({ handleAdd }) {
  const [newTaskName, setNewTaskName] = useState('');

  return (
    <div className={s.Form}>
      <input
        placeholder="Task"
        type="text"
        onChange={(e) => {
          setNewTaskName(e.target.value);
        }}
      />
      <button
        onClick={() => {
          handleAdd(newTaskName);
        }}
      >
        Add
      </button>
    </div>
  );
}

export default TodoForm;
