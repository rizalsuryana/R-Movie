import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../../utils/api';
import MovieCard from '../MovieCard';

const Container = styled.div`
  max-width: 1200px;
  margin: 80px auto 20px; /* Beri jarak dari navbar */
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

const Message = styled.p`
  color: var(--secondary-text);
  text-align: center;
  font-size: 1.2rem;
`;

const MovieTopRated = () => {
  const [topRatedMovie, setTopRatedMovie] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const topMovie = await api.getTopRatedMovies();
        setTopRatedMovie(topMovie.results);
      } catch (error) {
        console.error('Error fetching top-rated movies', error);
      } finally {
        setLoading(false);
      }
    };

    document.title = 'Top Rated Movie';
    fetchTopRatedMovies();
  }, []);

  return (
    <Container>
      <Title>Top Rated Movies</Title>
      {loading ? (
        <Message>Loading...</Message>
      ) : topRatedMovie.length > 0 ? (
        <MovieGrid>
          {topRatedMovie.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </MovieGrid>
      ) : (
        <Message>No top-rated movies available.</Message>
      )}
    </Container>
  );
};

export default MovieTopRated;
