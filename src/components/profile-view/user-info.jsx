import { Col, Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './user-info.scss';

export const UserInfo = ({ name, email, birthday }) => {
  return (
    <>
      <Container>
        <h1>User Profile</h1>
        <>
          <Col>
            <strong>Username:</strong> {name}
          </Col>
          <Col>
            <strong>Email:</strong> {email}
          </Col>
          <Col>
            <strong>Birthday:</strong>
            {birthday}
          </Col>
        </>
      </Container>
    </>
  );
};

UserInfo.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  birthday: PropTypes.string.isRequired,
};
