import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../../utils/api';
import { toast } from 'react-toastify';
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

const MoviePopular = () => {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await api.getPopularMovie();
        setMovieList(data.results);
      } catch (error) {
        toast.error('Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    };

    document.title = 'Popular Movie';
    fetchMovie();
  }, []);

  return (
    <Container>
      <Title>Popular Movies</Title>
      {loading ? (
        <Message>Loading...</Message>
      ) : movieList.length > 0 ? (
        <MovieGrid>
          {movieList.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </MovieGrid>
      ) : (
        <Message>No popular movies available.</Message>
      )}
    </Container>
  );
};

export default MoviePopular;
