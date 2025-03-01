import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome, FaFire, FaClock, FaPlay, FaStar } from 'react-icons/fa';

const BottomNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #141414;
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;

    @media (min-width: 768px) {
    display: none;
  }
`;

const NavItem = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px;
  flex: 1;

  &:hover {
    color: #e50914;
  }
`;

const NavbarBottom = () => {
  return (
    <BottomNav>
      <NavItem to="/">
        <FaHome size={20} />
        <span>Home</span>
      </NavItem>
      <NavItem to="/popular">
        <FaFire size={20} />
        <span>Popular</span>
      </NavItem>
      <NavItem to="/upcoming">
        <FaClock size={20} />
        <span>Upcoming</span>
      </NavItem>
      <NavItem to="/now-playing">
        <FaPlay size={20} />
        <span>NowPlaying</span>
      </NavItem>
      <NavItem to="/top-rated">
        <FaStar size={20} />
        <span>Top Rated</span>
      </NavItem>
    </BottomNav>
  );
};

export default NavbarBottom;
