import React, { useState } from 'react';

import AuthedNavbar from './AuthedNavbar';

import './Navbar.scss';

interface NavbarProps {
  isAuthenticated: boolean;
}

// Vertical navbar on the left of screen on laptop and tablet, horizontal on mobile
const Navbar: React.SFC<NavbarProps> = ({ isAuthenticated }) => {
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);

  const handleNavbarBurgerClick = (): void => {
    setIsNavbarExpanded(!isNavbarExpanded);
  };

  return (
    <nav
      className={`navbar ${isAuthenticated ? 'is-slightly-transparent' : ''}`}
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <button
          type="button"
          onClick={handleNavbarBurgerClick}
          className={`navbar-burger burger ${
            isNavbarExpanded ? 'is-active' : ''
          }`}
          aria-label="menu"
          aria-expanded={isNavbarExpanded}
          data-target="navbar"
        >
          {/* Hamburger logo - for mobile view */}
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>
      <AuthedNavbar isNavbarExpanded={isNavbarExpanded} />
    </nav>
  );
};

export default Navbar;
