import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import MovieCard from '../MovieCard';

const MovieTopRated = () => {
  const [topRatedMovie, setTopRatedMovie] = useState([]);

  useEffect(()=> {
    const fetchTopRatedMovies = async () => {
      try {
        const topMovie = await api.getTopRatedMovies();

        setTopRatedMovie(topMovie.results);
      } catch (error) {
        console.error('error fecth top rated movie', error);
      }
    };
    document.title = 'R-Movie | Top Rated Movie';

    fetchTopRatedMovies();
  }, []);
  return (
    <>
      <h1>Top Rated Movies</h1>
      <div>
        {
          topRatedMovie.map((movie)=>(
            <MovieCard key={movie?.id} movie={movie}/>
          ))
        }
      </div>
    </>
  );
};

export default MovieTopRated;