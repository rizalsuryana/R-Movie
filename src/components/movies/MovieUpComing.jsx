import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import MovieCard from '../MovieCard';

const MovieUpComing = () => {
  const [upcomingMovie, setUpcomingMovie] = useState([]);

  useEffect(()=> {
    const fetchUpcomingMovie = async () => {
      try {
        const _upcomingMovies = await api.getUpComingMovies();
        setUpcomingMovie(_upcomingMovies.results);
      } catch (error) {
        console.error('error fetch upcoming movie', error);
      }
    };
    document.title = 'R-Movie | Upcoming Movie';
    fetchUpcomingMovie();
  }, []);
  return (
    <div>
      <h1>Upcoming Movies</h1>
      <div>
        {
          upcomingMovie.map((movie)=> (
            <MovieCard key={movie.id} movie={movie}/>
          ))
        }
      </div>

    </div>
  );
};

export default MovieUpComing;