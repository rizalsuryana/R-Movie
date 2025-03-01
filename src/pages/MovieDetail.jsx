import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const MovieContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MovieIntro = styled.div`
  width: 100%;
`;

const Backdrop = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  object-position: 0 35%;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const MovieDetailWrapper = styled.div`
  align-items: center;
  width: 75%;
  display: flex;
  flex-direction: row;
  position: relative;
  bottom: 225px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    bottom: 100px;
    width: 90%;
  }
`;

const MoviePoster = styled.img`
  width: 300px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.86) 0px 22px 40px 6px;
  margin-right: 30px;

  @media (max-width: 768px) {
    width: 200px;
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const MovieDetailRight = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

const MovieTitle = styled.h1`
  font-weight: 600;
  font-size: 2.5rem;
  text-shadow: 0px 0px 5px #000000;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Tagline = styled.p`
  font-style: italic;
  text-shadow: 0px 0px 5px #000000;
  margin-bottom: 1rem;
`;

const Rating = styled.div`
  font-size: 1.2rem;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Genres = styled.div`
  margin: 1.25rem 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Genre = styled.span`
  padding: 0.5rem;
  border: 2px solid white;
  border-radius: 20px;
  margin: 0.5rem;
`;

const Synopsis = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.25rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const MovieDetail = () => {
  const [detailMovie, setDetailMovie] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchDetailMovie = async () => {
      try {
        const movieDetail = await api.getDetailMovie(id);
        setDetailMovie(movieDetail);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };
    fetchDetailMovie();
    window.scrollTo(0, 0);
  }, [id]);

  if (!detailMovie) return <MovieContainer>Loading...</MovieContainer>;

  return (
    <MovieContainer>
      <MovieIntro>
        <Backdrop src={`https://image.tmdb.org/t/p/original${detailMovie.backdrop_path}`} alt={detailMovie.title} />
      </MovieIntro>
      <MovieDetailWrapper>
        <MoviePoster src={`https://image.tmdb.org/t/p/original${detailMovie.poster_path}`} alt={detailMovie.title} />
        <MovieDetailRight>
          <MovieTitle>{detailMovie.original_title}</MovieTitle>
          <Tagline>{detailMovie.tagline}</Tagline>
          <Rating>
            ⭐ {detailMovie.vote_average}
            <span> ({detailMovie.vote_count})</span>
          </Rating>
          <p>Durasi: {detailMovie.runtime} menit</p>
          <p>Rilis: {detailMovie.release_date}</p>
          <Genres>
            {detailMovie.genres.map((genre) => (
              <Genre key={genre.id}>{genre.name}</Genre>
            ))}
          </Genres>
          <Synopsis>{detailMovie.overview}</Synopsis>
        </MovieDetailRight>
      </MovieDetailWrapper>
    </MovieContainer>
  );
};

export default MovieDetail;