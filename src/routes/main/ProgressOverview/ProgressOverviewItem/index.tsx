import React from 'react';

import { getDisplayDate, isWarning, getDaysRemaining } from 'utils/timeUtils';
import { getProgress } from 'utils/progressUtils';
import { useTheme } from 'contexts/themeContext';
import ToDo from 'interfaces/ToDo';

import './ProgressOverviewItem.scss';

interface ProgressOverviewItemProps {
  todo: ToDo;
  currentKey: number;
  keyLimit: number;
}

const ProgressOverviewItem: React.SFC<ProgressOverviewItemProps> = ({
  todo,
  currentKey,
  keyLimit
}) => {
  const { theme } = useTheme();
  const { title, endTime, completed, subtodos } = todo;
  const displayDate = getDisplayDate(endTime);
  const warning = isWarning(endTime); // check if display date needs to be red
  const daysRemaining = getDaysRemaining(endTime, completed);
  const progressAmount = completed ? 100 : getProgress(subtodos);

  return (
    <li
      className={`progress-item ${
        currentKey < keyLimit ? 'has-bottom-border' : ''
      }`}
    >
      <div className="progress-item__content">
        <span className="progress-item__title">{title}</span>
        <span
          className={`progress-item__date ${
            // eslint-disable-next-line no-nested-ternary
            completed ? '' : warning ? 'has-text-danger' : ''
          }`}
        >
          {displayDate}
        </span>
      </div>
      <progress
        className={`progress progress-item__bar ${theme} `}
        value={`${progressAmount}`}
        max="100"
      >
        {progressAmount}
      </progress>
      <div className="progress-item__content">
        <span
          className={`progress-item__amount ${
            completed ? 'has-text-success' : ''
          }`}
        >
          {progressAmount}% COMPLETED
        </span>
        <span
          className={`progress-item__days ${
            // eslint-disable-next-line no-nested-ternary
            completed ? '' : warning ? 'has-text-danger' : ''
          }`}
        >
          {daysRemaining}
        </span>
      </div>
    </li>
  );
};

export default ProgressOverviewItem;
