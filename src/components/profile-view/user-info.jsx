import { Container } from 'react-bootstrap';
import './user-info.scss';

export const UserInfo = ({ name, email, birthday }) => {
  return (
    <>
      <Container>
        <h1>User Profile</h1>
        <div>
          <strong>Username:</strong> {name}
        </div>
        <div>
          <strong>Email:</strong> {email}
        </div>
        <div>
          <strong>Birthday:</strong>
          {birthday}
        </div>
      </Container>
    </>
  );
};
