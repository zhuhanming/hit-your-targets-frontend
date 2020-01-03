import React from 'react';
import { useDispatch } from 'react-redux';

import { useView } from 'contexts/viewContext';
import { useTheme } from 'contexts/themeContext';
import { useSearch } from 'contexts/searchContext';
import { View } from 'interfaces/ViewContext';
import { startSearch, cancelSearch } from 'reducers/SearchDux';

import './ViewSelector.scss';

const ViewSelector = () => {
  const { viewSelected, updateView } = useView();
  const { searchType } = useSearch();
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const handleViewClick = (newView: View) => {
    if (viewSelected !== newView) {
      updateView(newView);
    }
  };

  const handleSearchClick = () => {
    if (searchType) {
      dispatch(cancelSearch());
    } else {
      dispatch(startSearch());
      updateView(View.ALL);
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
            onClick={() => handleViewClick(View.TODAY)}
          >
            Today
          </button>{' '}
          |{' '}
          <button
            type="button"
            className={`as-non-button ${theme} ${
              viewSelected === View.NEXT_SEVEN_DAYS ? 'is-active' : ''
            }`}
            onClick={() => handleViewClick(View.NEXT_SEVEN_DAYS)}
          >
            Next 7 Days
          </button>{' '}
          |{' '}
          <button
            type="button"
            className={`as-non-button ${theme} ${
              viewSelected === View.ALL ? 'is-active' : ''
            }`}
            onClick={() => handleViewClick(View.ALL)}
          >
            All
          </button>{' '}
          |{' '}
          <button
            type="button"
            className={`as-non-button ${theme} ${
              viewSelected === View.COMPLETED ? 'is-active' : ''
            }`}
            onClick={() => handleViewClick(View.COMPLETED)}
          >
            Completed
          </button>
        </p>
      </div>
      <div className="selector__tag">
        <button
          type="button"
          className={`as-non-button ${theme} ${
            searchType ? 'has-text-danger' : ''
          }`}
          onClick={handleSearchClick}
        >
          {searchType ? 'Cancel Search' : 'Search'}
        </button>
      </div>
    </div>
  );
};

export default ViewSelector;
