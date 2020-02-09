import React from 'react';

import '../Card.scss';

interface MainCardProps {
  title: string;
}

// Reusable Main Card Container
const MainCard: React.SFC<MainCardProps> = ({ children, title }) => {
  return (
    <div className="main-card column is-one-third is-full-mobile ">
      <h2 className="subtitle main-card__title">{title}</h2>
      <div className="box is-slightly-transparent main-card__body">
        {children}
      </div>
    </div>
  );
};

export default MainCard;
