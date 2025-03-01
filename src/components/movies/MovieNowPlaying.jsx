import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import MovieCard from '../MovieCard';

const MovieNowPlaying = () => {
  const [nowPlayingMovie, setNowPlayingMovie] = useState([]);

  useEffect(()=> {
    const fetchNowPlayingMovie = async () => {
      try {
        const nowPlayingMovie = await api.getNowPlayingMovies();

        setNowPlayingMovie(nowPlayingMovie.results);
      } catch (error) {
        console.error('error fetch now playing', error);
      }
    };
    document.title = 'R-Movie | Now Playing Movie';
    fetchNowPlayingMovie();
  }, []);
  return (
    <div>

      <h1>Now Playing</h1>
      {
        nowPlayingMovie.map((movie)=> <MovieCard key={movie.id} movie={movie}/>)
      }

    </div>
  );
};

export default MovieNowPlaying;