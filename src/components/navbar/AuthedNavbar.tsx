import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { HOME, LIST, KANBAN, CALENDAR, SETTINGS } from 'constants/routes';
import { useTheme } from 'contexts/themeContext';

import './AuthedNavbar.scss';

interface AuthTabsProps {
  pathname: string;
}

// Main 4 tabs on the top of the navbar
const AuthTabs: React.SFC<AuthTabsProps> = ({ pathname }) => {
  return (
    <>
      <li className={`${pathname.match(`${HOME}`) ? 'is-active' : ''}`}>
        <div
          className="tooltip tooltip__container is-tooltip-right is-tooltip-bottom-mobile"
          data-tooltip="Home"
        >
          <Link to={HOME}>
            <i className="fas fa-home" />
          </Link>
        </div>
      </li>
      <li className={`${pathname.match(`${LIST}`) ? 'is-active' : ''}`}>
        <div
          className="tooltip tooltip__container is-tooltip-right is-tooltip-bottom-mobile"
          data-tooltip="List View"
        >
          <Link to={LIST}>
            <i className="fas fa-list" />
          </Link>
        </div>
      </li>
      <li className={`${pathname.match(`${KANBAN}`) ? 'is-active' : ''}`}>
        <div
          className="tooltip tooltip__container is-tooltip-right is-tooltip-bottom-mobile"
          data-tooltip="Kanban View"
        >
          <Link to={KANBAN}>
            <i className="fas fa-clipboard-list" />
          </Link>
        </div>
      </li>
      <li className={`${pathname.match(`${CALENDAR}`) ? 'is-active' : ''}`}>
        <div
          className="tooltip tooltip__container is-tooltip-right is-tooltip-bottom-mobile"
          data-tooltip="Calendar View"
        >
          <Link to={CALENDAR}>
            <i className="fas fa-calendar-alt " />
          </Link>
        </div>
      </li>
    </>
  );
};

interface AuthedNavbarProps {
  isNavbarExpanded: boolean;
}

// Adds the user settings tab below the AuthTabs
const AuthedNavbar: React.SFC<AuthedNavbarProps> = ({ isNavbarExpanded }) => {
  const { pathname } = useLocation();
  const { theme } = useTheme();

  return (
    <div
      id="navbar"
      className={`navbar-menu ${theme} ${isNavbarExpanded ? 'is-active' : ''}`}
    >
      <div className="navbar-item main-route-tabs">
        <div className="tabs is-centered">
          <ul>
            <AuthTabs pathname={pathname} />
          </ul>
        </div>

        <div className="tabs is-centered">
          <ul>
            <li
              className={`${pathname.match(`${SETTINGS}`) ? 'is-active' : ''}`}
            >
              <div
                className="tooltip tooltip__container is-tooltip-right is-tooltip-bottom-mobile"
                data-tooltip="Profile"
              >
                <Link to={SETTINGS}>
                  <i className="fas fa-user" />
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AuthedNavbar;
