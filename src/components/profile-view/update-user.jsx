import Form from 'react-bootstrap/Form';
import { FormLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Container, Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './profile-view.scss';

export const UpdateUser = ({ user, token }) => {
  const [updating, setUpdating] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newBirthday, setNewBirthday] = useState('');

  const handleUpdate = (event) => {
    event.preventDefault();

    const updateData = {
      Username: newUsername,
      Password: newPassword,
      Email: newEmail,
      Birthday: newBirthday,
    };

    fetch(`https://flixapptime-44f9e1282e9e.herokuapp.com/users/${Username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the user data and reset the form fields
        setUserData(data);
        setNewUsername(data.Username);
        setNewPassword(data.Password);
        setNewEmail(data.Email);
        setNewBirthday(data.Birthday);
        setUpdating(false);
      })
      .catch((error) => {
        console.error(`Something's wrong: ${error}`);
      });
  };

  return (
    <Container className="d-flex align-items-left justify-content-left vh-100">
      <Form onSubmit={handleUpdate}>
        <Form.Group controlId="formUsername">
          <Form.Label style={{ fontWeight: 'bold' }}>Username: </Form.Label>
          <Form.Control
            style={{ border: 'solid 1.5px' }}
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            required
            minLength="6"
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label style={{ fontWeight: 'bold' }}>Password: </Form.Label>
          <Form.Control
            style={{ border: 'solid 1.5px' }}
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength="8"
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label style={{ fontWeight: 'bold' }}>Email: </Form.Label>
          <Form.Control
            style={{ border: 'solid 1.5px' }}
            type="email"
            value={newEmail}
            onChange={(e) => {
              setNewEmail(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="formBirthday">
          <Form.Label style={{ fontWeight: 'bold' }}>Birthday: </Form.Label>
          <Form.Control
            style={{ border: 'solid 1.5px' }}
            type="date"
            value={newBirthday}
            onChange={(e) => {
              setNewBirthday(e.target.value);
            }}
          />
        </Form.Group>
        <br />
        <Button
          className="p-2.75"
          style={{ fontWeight: 'bold', color: 'white' }}
          variant="primary"
          type="submit">
          Update profile
        </Button>
      </Form>
    </Container>
  );
};
