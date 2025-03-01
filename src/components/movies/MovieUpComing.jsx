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

const MovieUpComing = () => {
  const [upcomingMovie, setUpcomingMovie] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingMovie = async () => {
      try {
        const _upcomingMovies = await api.getUpComingMovies();
        setUpcomingMovie(_upcomingMovies.results);
      } catch (error) {
        console.error('Error fetching upcoming movies', error);
      } finally {
        setLoading(false);
      }
    };

    document.title = 'R-Movie | Upcoming Movie';
    fetchUpcomingMovie();
  }, []);

  return (
    <Container>
      <Title>Upcoming Movies</Title>
      {loading ? (
        <Message>Loading...</Message>
      ) : upcomingMovie.length > 0 ? (
        <MovieGrid>
          {upcomingMovie.map((movie) => (
            <MovieCard key={movie?.id} movie={movie} />
          ))}
        </MovieGrid>
      ) : (
        <Message>No upcoming movies available.</Message>
      )}
    </Container>
  );
};

export default MovieUpComing;
