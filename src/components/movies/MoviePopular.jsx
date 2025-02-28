import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import { toast } from 'react-toastify';

const MoviePopular = () => {
  const [movieList, setMovieList] = useState([]);

  useEffect(()=> {
    const fetchMovie = async () => {
      try {
        const data = await api.getPopularMovie();
        setMovieList(data.results);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchMovie();
  }, []);

  return (
    <div>
      {
        movieList.map((movie)=> (
          <div key={movie.id}>
            <h1>{movie?.title}</h1>
            <p>{movie?.release_date}</p>
            <img src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`}
              alt={movie.title}/>
            <p>Rating: {movie?.vote_average}</p>
            <span>{movie?.vote_count} Votes</span>
          </div>
        ))
      }
    </div>
  );
};

export default MoviePopular;