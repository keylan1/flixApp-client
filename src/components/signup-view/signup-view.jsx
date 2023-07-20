import { useState } from 'react';
import { FormLabel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

export const SignupView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch('https://flixapptime-44f9e1282e9e.herokuapp.com/users', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          alert('Signup successful');
          window.location.reload();
        } else {
          alert('Signup failed');
        }
      })
      .catch((e) => {
        alert('Mistake made somewhere');
      });
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Form className="mt-100px" onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label style={{ fontWeight: 'bold' }}>Username:</Form.Label>
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
          <Form.Label style={{ fontWeight: 'bold' }}>Password:</Form.Label>
          <Form.Control
            style={{ border: 'solid 1.5px' }}
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            minLength="8"
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label style={{ fontWeight: 'bold' }}>Email:</Form.Label>
          <Form.Control
            style={{ border: 'solid 1.5px' }}
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="formBirthday">
          <Form.Label style={{ fontWeight: 'bold' }}>Birthday:</Form.Label>
          <Form.Control
            style={{ border: 'solid 1.5px' }}
            type="date"
            value={birthday}
            onChange={(e) => {
              setBirthday(e.target.value);
            }}
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
