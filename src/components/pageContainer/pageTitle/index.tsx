import React from 'react';

import ThemeToggle from './themeToggle';

import './PageTitle.scss';

const PageTitle = ({ titleText, className = '' }) => {
  return (
    <div className={`title-container ${className}`}>
      <h1 className="title title-container__text">{titleText}</h1>
      <ThemeToggle />
    </div>
  );
};

export default PageTitle;
