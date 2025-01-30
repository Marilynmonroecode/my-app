import React, { useState } from 'react';

const AuthPage = ({ handleLogin, handleRegister, setCurrentPage, message, isLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (isLogin) {
      handleLogin(formData);
    } else {
      handleRegister(formData);
    }
  };

  return (
    <div className="auth">
      <h1>{message ? message : isLogin ? 'Login' : 'Register'}</h1>

      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />
        {!isLogin && (
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        )}
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>

      <button onClick={() => setCurrentPage(isLogin ? 'register' : 'login')}>
        {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
      </button>
    </div>
  );
};

export default AuthPage;
