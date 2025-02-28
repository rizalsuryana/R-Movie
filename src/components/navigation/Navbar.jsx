import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/popular">Popular</Link></li>
        <li><Link to="/upcoming">Upcoming</Link></li>
        <li><Link to="/now-playing">Now Playing</Link></li>
        <li><Link to="/top-rated">Top Rated</Link></li>
      </ul>
    </nav>


  );
};

export default Navbar;