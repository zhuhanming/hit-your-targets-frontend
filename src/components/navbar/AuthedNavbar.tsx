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
