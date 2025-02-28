import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import MovieCard from '../components/MovieCard';

const Home = () => {
  const [trendingDay, setTrendingDay] = useState([]);
  const [trendingWeek, setTrendingWeek] = useState([]);

  useEffect(()=> {
    const fetchTrendingMovie = async () => {
      try {
        const dayMovie = await api.getTrendingMovieDay();
        const weekMovie = await api.getTrendingMovieWeeks();

        setTrendingDay(dayMovie.results);
        setTrendingWeek(weekMovie.results);
      } catch (error) {
        console.error('Error feching trending', error);
      }
    };

    fetchTrendingMovie();
  }, []);


  return (
    <div>
      <section className="hero">
        <h1>Welcome to Movie App 🎬</h1>
        <p>Discover trending, now playing, and upcoming movies.</p>
      </section>

      <section className="trending">
        <h2>🔥 Trending Today</h2>
        <ul>
          {trendingDay.map((movie) => (
            <MovieCard key={movie?.id} movie={movie}/>
          ))}
        </ul>
      </section>

      <section className="trending">
        <h2>📅 Trending This Week</h2>
        <ul>
          {trendingWeek.map((movie) => (
            <MovieCard key={movie?.id} movie={movie}/>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Home;