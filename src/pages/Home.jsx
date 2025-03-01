import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import api from '../utils/api';
import MovieCard from '../components/MovieCard';

const Container = styled.div`
  background-color: #141414;
  color: white;
  padding: 20px;
  min-height: 100vh;
`;

const Hero = styled.section`
  position: relative;
  text-align: center;
  margin-bottom: 30px;
  padding: 100px 20px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  transition: background-image 1s ease-in-out;
  // background-position: top center;
  background-position: center 20%;

  

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }
  p {
    font-size: 1.2rem;
    opacity: 0.8;
  }
  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }
    p {
      font-size: 1rem;
    }
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  padding-top: 50px; /* Tambahin ini buat geser teks ke bawah */
  
  @media (max-width: 768px) {
    padding-top: 30px; /* Sesuaikan buat tampilan kecil */
  }
`;

const Section = styled.section`
  margin-bottom: 30px;
  position: relative;
  padding: 0 50px;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const MoviesRow = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 10px;
  gap: 10px;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.5) transparent;
  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.5);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const ScrollButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid white;
  color: white;
  padding: 10px;
  cursor: pointer;
  z-index: 10;
  font-size: 20px;
  border-radius: 50%;
  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }
  @media (max-width: 768px) {
    padding: 8px;
    font-size: 16px;
  }
`;

const LeftButton = styled(ScrollButton)`
  left: 10px;
`;

const RightButton = styled(ScrollButton)`
  right: 10px;
`;

const Home = () => {
  const [trendingDay, setTrendingDay] = useState([]);
  const [trendingWeek, setTrendingWeek] = useState([]);
  const [heroMovies, setHeroMovies] = useState([]);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const rowRefs = {
    trendingDay: useRef(null),
    trendingWeek: useRef(null),
  };

  useEffect(() => {
    const fetchTrendingMovie = async () => {
      try {
        const dayMovie = await api.getTrendingMovieDay();
        const weekMovie = await api.getTrendingMovieWeeks();

        setTrendingDay(dayMovie.results);
        setTrendingWeek(weekMovie.results);
        setHeroMovies(dayMovie.results.slice(0, 5));
      } catch (error) {
        console.error('Error fetching trending', error);
      }
    };
    document.title = 'R-Movie';
    fetchTrendingMovie();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroMovies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroMovies]);

  const scroll = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({ left: direction * 300, behavior: 'smooth' });
    }
  };

  return (
    <Container>
      <Hero style={{ backgroundImage: heroMovies.length > 0 ? `url(https://image.tmdb.org/t/p/original${heroMovies[currentHeroIndex]?.backdrop_path})` : 'none' }}>
        <HeroContent>
          <h1>{heroMovies.length > 0 ? heroMovies[currentHeroIndex]?.title : 'Welcome to Movie App 🎬'}</h1>
          <p>{heroMovies.length > 0 ? heroMovies[currentHeroIndex]?.overview : 'Discover trending, now playing, and upcoming movies.'}</p>
        </HeroContent>
      </Hero>

      <Section>
        <h2>🔥 Trending Today</h2>
        <LeftButton onClick={() => scroll(rowRefs.trendingDay, -1)}>&lt;</LeftButton>
        <MoviesRow ref={rowRefs.trendingDay}>
          {trendingDay.map((movie) => (
            <MovieCard key={movie?.id} movie={movie} />
          ))}
        </MoviesRow>
        <RightButton onClick={() => scroll(rowRefs.trendingDay, 1)}>&gt;</RightButton>
      </Section>

      <Section>
        <h2>📅 Trending This Week</h2>
        <LeftButton onClick={() => scroll(rowRefs.trendingWeek, -1)}>&lt;</LeftButton>
        <MoviesRow ref={rowRefs.trendingWeek}>
          {trendingWeek.map((movie) => (
            <MovieCard key={movie?.id} movie={movie} />
          ))}
        </MoviesRow>
        <RightButton onClick={() => scroll(rowRefs.trendingWeek, 1)}>&gt;</RightButton>
      </Section>
    </Container>
  );
};

export default Home;
