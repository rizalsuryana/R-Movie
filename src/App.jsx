import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import MovieNowPlaying from './components/movies/MovieNowPlaying';
import MoviePopular from './components/movies/MoviePopular';
import MovieTopRated from './components/movies/MovieTopRated';
import MovieUpComing from './components/movies/MovieUpComing';
import Navbar from './components/navigation/Navbar';
import { Route, Routes } from 'react-router-dom';
import './styles/style.css';

function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/popular" element={<MoviePopular />} />
        <Route path="/upcoming" element={<MovieUpComing />} />
        <Route path="/now-playing" element={<MovieNowPlaying />} />
        <Route path="/top-rated" element={<MovieTopRated />} />
      </Routes>
    </div>
  );
}

export default App;
