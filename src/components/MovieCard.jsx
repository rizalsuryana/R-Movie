import React from 'react';

const MovieCard = ({ movie }) => {
  return (
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
  );
};

export default MovieCard;