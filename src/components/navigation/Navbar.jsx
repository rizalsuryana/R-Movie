import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';

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
  justify-content: space-evenly; /* Bagi rata ruang antar item */
  list-style: none;
  padding: 0;
  margin: 0;
  width: 60%; /* Biar navbar gak terlalu rapat */
  flex-wrap: nowrap;

  @media (max-width: 1024px) {
    width: 70%;
  }

  @media (max-width: 768px) {
    position: absolute;
    top: 60px;
    left: ${({ open }) => (open ? '0' : '-100%')};
    width: 100%;
    flex-direction: column;
    background: #141414;
    padding: 20px;
    transition: left 0.3s ease-in-out;
  }
`;

const NavItem = styled.li`
  position: relative;
  flex-shrink: 0; /* Supaya item tidak mengecil */
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 10px 20px; /* Tambah padding supaya lebih nyaman */
  white-space: nowrap; /* Supaya teks tidak terpotong */
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

const MenuIcon = styled.div`
  display: none;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Nav isScrolled={isScrolled}>
      <Logo>R-Movie</Logo>
      <MenuIcon onClick={() => setOpen(!open)}>
        {open ? <FaTimes /> : <FaBars />}
      </MenuIcon>
      <NavList open={open}>
        {['Home', 'Popular', 'Upcoming', 'Now Playing', 'Top Rated'].map((text) => (
          <NavItem key={text}>
            <NavLink to={text === 'Home' ? '/' : `/${text.toLowerCase().replace(' ', '-')}`} onClick={() => setOpen(false)}>
              {text}
            </NavLink>
          </NavItem>
        ))}
      </NavList>
    </Nav>
  );
};

export default Navbar;
