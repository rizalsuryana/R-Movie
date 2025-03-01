import React from 'react';
import styled from 'styled-components';

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
    height: 320px;
    background: #1c1c1c;
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0px 8px 20px rgba(255, 255, 255, 0.2);
    }
`;

const MovieImage = styled.img`
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;

const MovieInfo = styled.div`
    padding: 10px;

    h3 {
        font-size: 1rem;
        margin-bottom: 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 180px;
    }

    p {
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.7);
        margin-bottom: 5px;
    }

    span {
        font-size: 0.85rem;
        font-weight: bold;
        color: #f4c518;
    }
`;

const MovieCard = ({ movie }) => {
  return (
    <MovieCardStyled>
      <MovieImage src={`https://image.tmdb.org/t/p/w300${movie?.backdrop_path}`} alt={movie?.title} />
      <MovieInfo>
        <h3>{movie?.title}</h3>
        <p>{movie?.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}</p>
        <span>⭐ {movie?.vote_average} ({movie?.vote_count} votes)</span>
      </MovieInfo>
    </MovieCardStyled>
  );
};

export default MovieCard;
