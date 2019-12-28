import React, { useState } from 'react';

import AuthedNavbar from './AuthedNavbar';

import './Navbar.scss';

const Navbar = ({ isAuthenticated }) => {
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);

  const handleNavbarBurgerClick = () => {
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
          {/* Hamburger logo */}
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
