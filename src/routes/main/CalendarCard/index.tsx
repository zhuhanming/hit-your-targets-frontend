import React from 'react';

import '../Card.scss';
import './CalendarCard.scss';

const CalendarCard = ({ children, title }) => {
  return (
    <div className="main-card column is-full ">
      <h2 className="subtitle main-card__title">{title}</h2>
      <div className="box is-slightly-transparent main-card__body calendar-card">
        {children}
      </div>
    </div>
  );
};

export default CalendarCard;
