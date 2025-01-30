import React from 'react';

const TaskItem = ({ task, handleUpdateTask, handleDeleteTask }) => {
  return (
    <li>
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => handleUpdateTask(task)}
        />
        <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
      </div>
    </li>
  );
};

export default TaskItem;
