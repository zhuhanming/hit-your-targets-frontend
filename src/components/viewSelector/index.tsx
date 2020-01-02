import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useView } from 'contexts/viewContext';
import { useTheme } from 'contexts/themeContext';
import { View } from 'interfaces/ViewContext';
import RootStateInterface from 'interfaces/RootState';
import { startSearch, cancelSearch } from 'reducers/SearchDux';

import './ViewSelector.scss';

const ViewSelector = () => {
  const { viewSelected, updateView } = useView();
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const selectSearch = (state: RootStateInterface) => state.search;
  const { searchType } = useSelector(selectSearch);
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
          className={`as-non-button ${theme}`}
          onClick={handleSearchClick}
        >
          {searchType ? 'Cancel Search' : 'Search'}
        </button>
      </div>
    </div>
  );
};

export default ViewSelector;
