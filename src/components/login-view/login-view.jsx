import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import './login-view.scss';

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      Username: username,
      Password: password,
    };

    fetch('https://flixapptime-44f9e1282e9e.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Login response: ', data);
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert('No such user');
        }
      })
      .catch((e) => {
        alert('Something went wrong');
      });
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label style={{ fontWeight: 'bold' }}>Username: </Form.Label>
          <Form.Control
            style={{ border: 'solid 1.5px' }}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="6"
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label style={{ fontWeight: 'bold' }}>Password: </Form.Label>
          <Form.Control
            style={{ border: 'solid 1.5px' }}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="8"
          />
        </Form.Group>
        <br />
        <Button
          className="p-2.75"
          style={{ fontWeight: 'bold', color: 'white' }}
          variant="primary"
          type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
