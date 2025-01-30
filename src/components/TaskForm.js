import React, { useState } from 'react';

const TaskForm = ({ handleAddTask }) => {
  const [newTask, setNewTask] = useState({ title: '', description: '', done: false });

  const onSubmit = (event) => {
    event.preventDefault();
    handleAddTask(newTask);
    setNewTask({ title: '', description: '', done: false });
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Task Description"
        value={newTask.description}
        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
