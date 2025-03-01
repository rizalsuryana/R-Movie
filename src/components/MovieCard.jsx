import React from 'react';
import styled from 'styled-components';

const MovieCardStyled = styled.div`
    display: inline-block;
    transition: transform .2s;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    margin: 0.19rem;
    cursor:pointer;
    min-width:200px;
    height:300px;
    z-index:0;
    border: 1px solid rgb(99, 99, 99);
`;

const MovieCard = ({ movie }) => {
  return (
    <MovieCardStyled>

      <div key={movie?.id}>
        <h3>{movie?.title}</h3>
        <p>{movie?.release_date}</p>
        <img
          src={`https://image.tmdb.org/t/p/w300${movie?.backdrop_path}`}
          alt={movie?.title}
        />
        <p>Rating: {movie?.vote_average}</p>
        <span>{movie?.vote_count} Votes</span>
      </div>
    </MovieCardStyled>
  );
};

export default MovieCard;