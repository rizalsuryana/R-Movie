import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background: ${({ isScrolled }) => (isScrolled ? '#141414' : 'rgba(20, 20, 20, 0.23)')};
  padding: 15px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  transition: background 0.3s ease-in-out;
`;

const Logo = styled.h1`
  color: white;
  font-size: 1.5rem;
  margin: 0;
`;

const NavList = styled.ul`
  display: flex;
  justify-content: space-evenly;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 60%;
  flex-wrap: nowrap;

  @media (max-width: 768px) {
    display: none; /* Sembunyikan menu di mobile */
  }
`;

const NavItem = styled.li`
  position: relative;
  flex-shrink: 0;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 10px 20px;
  white-space: nowrap;
  text-align: center;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #e50914;
  }

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -3px;
    width: 0;
    height: 2px;
    background: #e50914;
    transition: width 0.3s ease-in-out, left 0.3s ease-in-out;
  }

  &:hover::after {
    width: 100%;
    left: 0;
  }
`;

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Nav isScrolled={isScrolled}>
      <Logo>R-Movie</Logo>
      <NavList>
        {['Home', 'Popular', 'Upcoming', 'Now Playing', 'Top Rated'].map((text) => (
          <NavItem key={text}>
            <NavLink to={text === 'Home' ? '/' : `/${text.toLowerCase().replace(' ', '-')}`}>
              {text}
            </NavLink>
          </NavItem>
        ))}
      </NavList>
    </Nav>
  );
};

export default Navbar;
