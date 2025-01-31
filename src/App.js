import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import AuthPage from './components/AuthPage';
import ToDoPage from './components/ToDoPage';
import './index.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      fetchTasks();
    }
  }, [isLoggedIn]);

  const fetchTasks = async () => {
    try {
      const response = await fetch('https://backend-7dg6.onrender.com/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Updated login handler to use backend
  const handleLogin = async (loginData) => {
    try {
      const response = await fetch('https://backend-7dg6.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setIsLoggedIn(true);
        setCurrentPage('todo');
        setMessage('Login successful!');
      } else {
        setMessage(data.error || 'Invalid login credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('An error occurred during login. Please try again.');
    }
  };

  // Updated registration handler to automatically log in after successful registration
  const handleRegister = async (registerData) => {
    try {
      const response = await fetch('https://backend-7dg6.onrender.com/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
      });
      const data = await response.json();
      
      if (response.ok) {
        // Automatically log in after successful registration
        await handleLogin(registerData);
      } else {
        setMessage(data.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error('Error during registration:', error);
    }
  };

  const handleAddTask = async (newTask) => {
    try {
      const response = await fetch('https://backend-7dg6.onrender.com/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });
      const data = await response.json();
      setTasks([...tasks, data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleUpdateTask = async (task) => {
    const updatedTask = { ...task, done: !task.done };
    try {
      const response = await fetch(`https://backend-7dg6.onrender.com/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });
      const data = await response.json();
      setTasks(tasks.map((t) => (t.id === task.id ? data : t)));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await fetch(`https://backend-7dg6.onrender.com/tasks/${id}`, { method: 'DELETE' });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  if (currentPage === 'home') {
    return <HomePage setCurrentPage={setCurrentPage} message={message} />;
  }

  if (currentPage === 'login' || currentPage === 'register') {
    return (
      <AuthPage
        handleLogin={handleLogin}
        handleRegister={handleRegister}
        setCurrentPage={setCurrentPage}
        message={message}
        isLogin={currentPage === 'login'}
      />
    );
  }

  return (
    <ToDoPage
      tasks={tasks}
      handleAddTask={handleAddTask}
      handleUpdateTask={handleUpdateTask}
      handleDeleteTask={handleDeleteTask}
    />
  );
};

export default App;