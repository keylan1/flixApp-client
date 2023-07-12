import { useState } from 'react';

export const LoginView = ({ onLoggedIn }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      access: username,
      secret: password,
    };

    fetch('https://flixapptime-44f9e1282e9e.herokuapp.com/movies', {
      method: 'POST',
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        onLoggedIn(username);
      } else {
        alert('Login failed');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="6"
        />
      </label>
      <label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="10"
        />
      </label>
    </form>
  );
};
