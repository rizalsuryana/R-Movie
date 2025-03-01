import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MovieCardStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    min-width: 200px;
    height: 300px;
    background: #1c1c1c;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0px 8px 20px rgba(255, 255, 255, 0.2);
    }
`;

const MovieImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
`;

const MovieCard = ({ movie }) => {
  return (
    <MovieCardStyled>
      <Link to={`/movie/${movie.id}`}>
        <MovieImage src={`https://image.tmdb.org/t/p/w300${movie?.poster_path}`} alt={movie?.title} />
      </Link>
    </MovieCardStyled>
  );
};

export default MovieCard;