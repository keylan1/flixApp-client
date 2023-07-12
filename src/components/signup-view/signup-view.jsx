import { useState } from 'react';

export const SignupView = () => {
  const handleSubmit = (event) => {};

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="8"
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </label>
    </form>
  );
};
