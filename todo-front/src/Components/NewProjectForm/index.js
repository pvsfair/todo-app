import React from 'react';
import s from './styles.module.scss';

function NewProjectForm({ handleNewProject }) {
  return (
    <div className={s.Form}>
      <h2>Create a new project</h2>
      <input placeholder="Project name" type="text" />
      <button>Create Proejct</button>
    </div>
  );
}

export default NewProjectForm;
