import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../../utils/api';
import MovieCard from '../MovieCard';

const Container = styled.div`
  max-width: 1200px;
  margin: 80px auto 20px; /* Beri jarak dari navbar yang fixed */
  padding: 20px;
`;

const Title = styled.h1`
  color: white;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  justify-content: center;
`;

const MovieNowPlaying = () => {
  const [nowPlayingMovie, setNowPlayingMovie] = useState([]);

  useEffect(() => {
    const fetchNowPlayingMovie = async () => {
      try {
        const nowPlayingMovie = await api.getNowPlayingMovies();
        setNowPlayingMovie(nowPlayingMovie.results);
      } catch (error) {
        console.error('Error fetching now playing movies:', error);
      }
    };

    document.title = 'R-Movie | Now Playing Movie';
    fetchNowPlayingMovie();
  }, []);

  return (
    <Container>
      <Title>Now Playing</Title>
      <MovieGrid>
        {nowPlayingMovie.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </MovieGrid>
    </Container>
  );
};

export default MovieNowPlaying;
