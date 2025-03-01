import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
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
  background-position: center 20%;
  background-repeat: no-repeat;
  color: white;
  transition: background-image 1s ease-in-out;

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
  padding-top: 50px;

  @media (max-width: 768px) {
    padding-top: 30px;
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
  background: rgba(0, 0, 0, 0.6);
  border: none;
  color: white;
  padding: 12px;
  cursor: pointer;
  z-index: 10;
  font-size: 1.5rem;
  border-radius: 50%;
  transition: all 0.3s ease-in-out;
  opacity: 0.8;

  &:hover {
    background: rgba(255, 255, 255, 0.5);
    color: black;
    transform: translateY(-50%) scale(1.1);
    opacity: 1;
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 1.2rem;
  }
`;

const LeftButton = styled(ScrollButton)`
  left: 5px;
`;

const RightButton = styled(ScrollButton)`
  right: 5px;
`;

const ScrollableMovies = ({ movies, title }) => {
  const rowRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = () => {
    if (rowRef.current) {
      setCanScrollLeft(rowRef.current.scrollLeft > 0);
      setCanScrollRight(
        rowRef.current.scrollLeft < rowRef.current.scrollWidth - rowRef.current.clientWidth
      );
    }
  };

  useEffect(() => {
    handleScroll();
    rowRef.current?.addEventListener('scroll', handleScroll);
    return () => rowRef.current?.removeEventListener('scroll', handleScroll);
  }, []);

  const scroll = (direction) => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: direction * 300, behavior: 'smooth' });
    }
  };

  return (
    <Section>
      <h2>{title}</h2>
      {canScrollLeft && <LeftButton onClick={() => scroll(-1)}><FaChevronLeft /></LeftButton>}
      <MoviesRow ref={rowRef}>
        {movies.map((movie) => (
          <MovieCard key={movie?.id} movie={movie} />
        ))}
      </MoviesRow>
      {canScrollRight && <RightButton onClick={() => scroll(1)}><FaChevronRight /></RightButton>}
    </Section>
  );
};

const Home = () => {
  const [trendingDay, setTrendingDay] = useState([]);
  const [trendingWeek, setTrendingWeek] = useState([]);
  const [heroMovies, setHeroMovies] = useState([]);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingMovie = async () => {
      try {
        setLoading(true);
        const dayMovie = await api.getTrendingMovieDay();
        const weekMovie = await api.getTrendingMovieWeeks();

        setTrendingDay(dayMovie.results);
        setTrendingWeek(weekMovie.results);
        setHeroMovies(dayMovie.results.slice(0, 5));
      } catch (error) {
        console.error('Error fetching trending', error);
      } finally {
        setLoading(false);
      }
    };

    document.title = 'R-Movie';
    fetchTrendingMovie();
  }, []);

  useEffect(() => {
    if (heroMovies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroMovies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroMovies]);

  return (
    <Container>
      {loading ? (
        <p style={{ textAlign: 'center', fontSize: '1.5rem' }}>Loading...</p>
      ) : (
        <>
          <Hero
            style={{
              backgroundImage:
                heroMovies.length > 0
                  ? `url(https://image.tmdb.org/t/p/original${heroMovies[currentHeroIndex]?.backdrop_path})`
                  : 'none',
            }}
          >
            <HeroContent>
              <h1>{heroMovies.length > 0 ? heroMovies[currentHeroIndex]?.title : 'Welcome to Movie App 🎬'}</h1>
              <p>{heroMovies.length > 0 ? heroMovies[currentHeroIndex]?.overview : 'Discover trending, now playing, and upcoming movies.'}</p>
            </HeroContent>
          </Hero>

          <ScrollableMovies title="🔥 Trending Today" movies={trendingDay} />
          <ScrollableMovies title="📅 Trending This Week" movies={trendingWeek} />
        </>
      )}
    </Container>
  );
};

export default Home;
