import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import { toast } from 'react-toastify';
import MovieCard from '../MovieCard';

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
          <MovieCard key={movie?.id} movie={movie}/>
        ))
      }
    </div>
  );
};

export default MoviePopular;