import React, { useState } from 'react';
import s from './styles.module.scss';

function NewProjectForm({ handleNewProject }) {
  const [newProjectName, setNewProjectName] = useState('');
  const handleSubmit = () => {
    if (!newProjectName) return;
    handleNewProject(newProjectName);
    setNewProjectName('');
  };
  return (
    <div className={s.Form}>
      <h2>Create a new project</h2>
      <input
        placeholder="Project name"
        type="text"
        onChange={(e) => {
          setNewProjectName(e.target.value);
        }}
        value={newProjectName}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            e.stopPropagation();
            handleSubmit();
          }
        }}
      />
      <button onClick={handleSubmit}>Create Proejct</button>
    </div>
  );
}

export default NewProjectForm;
