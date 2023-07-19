import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

export const UserInfo = ({ user }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{user.Username}'s Profile</Card.Title>
        <Card.Text>
          <span>User: {user.Username}</span>
          <span>Email: {user.Email}</span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
