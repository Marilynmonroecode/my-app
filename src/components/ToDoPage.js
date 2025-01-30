import React from 'react';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

const ToDoPage = ({ handleAddTask, handleUpdateTask, handleDeleteTask, tasks }) => {
  return (
    <div className="App">
      <h1>To-Do List</h1>
      <TaskForm handleAddTask={handleAddTask} />
      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            handleUpdateTask={handleUpdateTask}
            handleDeleteTask={handleDeleteTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default ToDoPage;
