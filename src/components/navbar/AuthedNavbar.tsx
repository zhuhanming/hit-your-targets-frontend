import React from 'react';
// import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { HOME, LIST, KANBAN, CALENDAR, SETTINGS } from 'constants/routes';
import { useTheme } from 'contexts/themeContext';

// import ProfileDropdown from './profile-dropdown';

import './AuthedNavbar.scss';

const AuthTabs = ({ pathname }) => {
  // const hasOverdueTodos = useSelector(state =>
  //   Object.values(state.chat.unarchived).some(chat => chat.unreadCount > 0)
  // );

  return (
    <>
      <li className={`${pathname.match(`${HOME}`) ? 'is-active' : ''}`}>
        <Link to={HOME}>
          <i
            className="fas fa-home has-tooltip-right has-tooltip-bottom-mobile"
            data-tooltip="Home"
          />
        </Link>
      </li>
      <li className={`${pathname.match(`${LIST}`) ? 'is-active' : ''}`}>
        <Link to={LIST}>
          <i
            className="fas fa-list has-tooltip-right has-tooltip-bottom-mobile"
            data-tooltip="List View"
          />
        </Link>
      </li>
      <li className={`${pathname.match(`${KANBAN}`) ? 'is-active' : ''}`}>
        <Link to={KANBAN}>
          <i
            className="fas fa-clipboard-list has-tooltip-right has-tooltip-bottom-mobile"
            data-tooltip="Kanban View"
          />
        </Link>
      </li>
      <li className={`${pathname.match(`${CALENDAR}`) ? 'is-active' : ''}`}>
        <Link to={CALENDAR}>
          <i
            className="fas fa-calendar-alt has-tooltip-right has-tooltip-bottom-mobile"
            data-tooltip="Calendar View"
          />
        </Link>
      </li>
      {/* <li className={`${pathname.startsWith(`${CHAT}`) ? 'is-active' : ''}`}>
        <Link to={CHAT}>
          {hasUnreadMessages ? (
            <span
              className="has-badge-rounded has-badge-danger has-badge-small"
              data-badge=""
            >
              Matches
            </span>
          ) : (
          <span>Matches</span>
          )}
        </Link>
      </li> */}
    </>
  );
};

const AuthedNavbar = ({ isNavbarExpanded }) => {
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
              <Link to={SETTINGS}>
                <i
                  className="fas fa-user has-tooltip-right has-tooltip-bottom-mobile"
                  data-tooltip="Profile"
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AuthedNavbar;
