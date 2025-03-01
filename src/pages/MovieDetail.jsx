import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome, FaImdb } from 'react-icons/fa';

const MovieContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeIn 1s ease-in-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const MovieIntro = styled.div`
  width: 100%;
`;

const Backdrop = styled.div`
  width: 100%;
  height: 500px;
  position: relative;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%),
    url(${(props) => props.src});
  background-size: cover;
  background-position: 0 35%;
  background-attachment: fixed;

  @media (max-width: 768px) {
    height: 300px;
    background-attachment: scroll;
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
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: rgba(0, 0, 0, 0.96) 0px 25px 50px 10px;
  }

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
  font-size: clamp(2rem, 5vw, 2.5rem);
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
  margin-bottom: 0.5rem;
`;

const Tagline = styled.p`
  font-style: italic;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
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
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  font-weight: 600;
  margin-bottom: 1.25rem;
`;

const UsefulLinksContainer = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  width: 75%;
  text-align: center;
  color: white;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Links = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;

  a {
    color: white;
    text-decoration: none;
    font-weight: 600;
    padding: 0.5rem 1rem;
    border: 2px solid white;
    border-radius: 20px;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
`;

const ProductionCompaniesContainer = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  width: 75%;
  text-align: center;
  color: white;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Company = styled.div`
  display: inline-block;
  margin: 1rem;
  text-align: center;

  img {
    max-width: 150px;
    margin-bottom: 10px;
  }

  p {
    color: white;
    font-size: 1rem;
    margin: 0;
  }
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #fff;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
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

  if (!detailMovie) return (
    <MovieContainer>
      <LoadingSpinner />
    </MovieContainer>
  );

  return (
    <MovieContainer>
      <MovieIntro>
        <Backdrop src={`https://image.tmdb.org/t/p/original${detailMovie.backdrop_path}`} />
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

      <UsefulLinksContainer>
        <h2>More Info</h2>
        <Links>
          {detailMovie.homepage && (
            <a href={detailMovie.homepage} target="_blank" rel="noopener noreferrer">
              <FaHome /> Homepage
            </a>
          )}
          {detailMovie.imdb_id && (
            <a href={`https://www.imdb.com/title/${detailMovie.imdb_id}`} target="_blank" rel="noopener noreferrer">
              <FaImdb /> IMDb
            </a>
          )}
        </Links>
      </UsefulLinksContainer>

      <ProductionCompaniesContainer>
        <h2>Production Companies</h2>
        {detailMovie.production_companies && detailMovie.production_companies.map((company) => (
          company.logo_path && (
            <Company key={company.id}>
              <img src={`https://image.tmdb.org/t/p/original${company.logo_path}`} alt={company.name} />
              <p>{company.name}</p>
            </Company>
          )
        ))}
      </ProductionCompaniesContainer>
    </MovieContainer>
  );
};

export default MovieDetail;