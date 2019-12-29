import React from 'react';

import { useView } from 'contexts/viewContext';
import { useTheme } from 'contexts/themeContext';
import { View } from 'interfaces/ViewContext';

import './ViewSelector.scss';

const ViewSelector = () => {
  const { viewSelected, updateView } = useView();
  const { theme } = useTheme();

  const handleClick = (newView: View) => {
    if (viewSelected !== newView) {
      updateView(newView);
    }
  };

  return (
    <div className="selector">
      <div className="selector__view">
        <p className="">
          <span>View:</span>{' '}
          <button
            type="button"
            className={`as-non-button ${theme} ${
              viewSelected === View.TODAY ? 'is-active' : ''
            }`}
            onClick={() => handleClick(View.TODAY)}
          >
            Today
          </button>{' '}
          |{' '}
          <button
            type="button"
            className={`as-non-button ${theme} ${
              viewSelected === View.NEXT_SEVEN_DAYS ? 'is-active' : ''
            }`}
            onClick={() => handleClick(View.NEXT_SEVEN_DAYS)}
          >
            Next 7 Days
          </button>{' '}
          |{' '}
          <button
            type="button"
            className={`as-non-button ${theme} ${
              viewSelected === View.ALL ? 'is-active' : ''
            }`}
            onClick={() => handleClick(View.ALL)}
          >
            All
          </button>{' '}
          |{' '}
          <button
            type="button"
            className={`as-non-button ${theme} ${
              viewSelected === View.COMPLETED ? 'is-active' : ''
            }`}
            onClick={() => handleClick(View.COMPLETED)}
          >
            Completed
          </button>
        </p>
      </div>
      <div className="selector__tag">
        <p>Tags</p>
      </div>
    </div>
  );
};

export default ViewSelector;
