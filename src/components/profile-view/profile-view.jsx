import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { UserInfo } from './user-info.jsx';
import { FavoriteMovies } from './favorite-movies.jsx';
import { UpdateUser } from './update-user.jsx';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './profile-view.scss';

export const ProfileView = ({user, token, movies}) => {
  const [user, setUser] = useState(""); 

  useEffect(() => {


    fetch(`https://flixapptime-44f9e1282e9e.herokuapp.com/users/${Username}`, {
      headers: { Authorization: `Bearer: ${token}` },
    })
      .then((response) => response.json())
      .then((user) => {
        const flixUserApi = {
            _id: user._id,
            Username: user.Username,
            Email: user.Email,
            Birthday: user.Birthday,
            FavoriteMovies: user.FavoriteMovies
          };
          console.log(user);
        setUser(flixUserApi);
      });
  }, []);

  return (
    <>
    <div>
      <UserInfo user={user.Username} email={user.Email}/>
      </div>
   </>
  );
};

export const  = ({ users }) => {
  const { username } = useParams();
  const user = users.find((u) => u === username);
  return (
    <Card className="justify-content-center card-view">
      <div className="d-flex justify-content-center align-items-center aspect-ratio-container">
        <Card.Img
          crossOrigin="anonymous"
          className="justify-content-center centered-image"
          variant="top"
          src={movie.ImagePath}
        />
      </div>
      <Card.Title
        className="align-items-left ms-3"
        style={{ fontWeight: 'bold' }}>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </Card.Title>
      <Card.Body className="d-flex flex-column align-items-left justify-content-between">
        <div>
          <span style={{ fontWeight: 'bold' }}>Description: </span>
          <span>{movie.Description}</span>
        </div>
        <div>
          <span style={{ fontWeight: 'bold' }}>Genre: </span>
          {movie.Genre && (
            <>
              <span style={{ fontWeight: 'bold' }}>{movie.Genre.name}</span>
              <span>{movie.Genre.description}</span>
            </>
          )}
        </div>
        <div>
          <span style={{ fontWeight: 'bold' }}>Director: </span>
          {movie.Director && (
            <>
              <span>{movie.Director.name}</span>
              <span>{movie.Director.bio}</span>
            </>
          )}
        </div>
        <div>
          <span style={{ fontWeight: 'bold' }}>Year: </span>
          <span>{movie.Year}</span>
        </div>
        <div>
          <span style={{ fontWeight: 'bold' }}>Actors: </span>
          <span>{movie.Actors}</span>
        </div>
        <div>
          <span style={{ fontWeight: 'bold' }}>Featured: </span>
          <span>{movie.Featured}</span>
        </div>
      </Card.Body>
      <div className="text-center">
        <Link to={`/`}>
          <Button size="lg" className="p-2.75 mb-3 back-button">
            Back
          </Button>
        </Link>
      </div>
    </Card>
  );
};


