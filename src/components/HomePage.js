import React from 'react';

const HomePage = ({ setCurrentPage, message }) => {
  return (
    <div className="home">
      <h1>Welcome to the To-Do App</h1>
      {message && <p>{message}</p>}
      <button onClick={() => setCurrentPage('login')}>Login</button>
      <button onClick={() => setCurrentPage('register')}>Register</button>
    </div>
  );
};

export default HomePage;
