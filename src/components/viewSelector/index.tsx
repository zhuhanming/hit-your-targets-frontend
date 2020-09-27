import React from 'react';
import { useDispatch } from 'react-redux';

import { useView } from 'contexts/viewContext';
import { useTheme } from 'contexts/themeContext';
import { useSearch } from 'contexts/searchContext';
import { View } from 'interfaces/ViewContext';
import { startSearch, cancelSearch } from 'reducers/SearchDux';
import KanbanSearch from './KanbanSearch';

import './ViewSelector.scss';

interface ViewSelectorProps {
  isMobile?: boolean;
  isKanban?: boolean;
}

// Bar containing view selections and search button
const ViewSelector: React.FunctionComponent<ViewSelectorProps> = ({
  isMobile = false,
  isKanban = false,
}) => {
  const { viewSelected, updateView } = useView();
  const { searchType } = useSearch();
  const dispatch = useDispatch();
  const { theme } = useTheme();

  // Change view selected
  const handleViewClick = (newView: View): void => {
    if (viewSelected !== newView) {
      updateView(newView);
    }
  };

  // Toggle between search mode and normal mode
  const handleSearchClick = (): void => {
    if (searchType) {
      dispatch(cancelSearch());
    } else {
      dispatch(startSearch());
      if (viewSelected !== View.COMPLETED) {
        updateView(View.ALL);
      }
    }
  };

  // View options differs based on list view or kanban view - kanban will only have ALL and COMPLETED
  const options = isKanban ? (
    <>
      <button
        type="button"
        className={`as-non-button ${theme} ${
          viewSelected === View.ALL ? 'is-active' : ''
        }`}
        onClick={(): void => handleViewClick(View.ALL)}
      >
        In Progress
      </button>{' '}
      |{' '}
      <button
        type="button"
        className={`as-non-button ${theme} ${
          viewSelected === View.COMPLETED ? 'is-active' : ''
        }`}
        onClick={(): void => handleViewClick(View.COMPLETED)}
      >
        Completed
      </button>
    </>
  ) : (
    <>
      <button
        type="button"
        className={`as-non-button ${theme} ${
          viewSelected === View.TODAY ? 'is-active' : ''
        }`}
        onClick={(): void => handleViewClick(View.TODAY)}
      >
        Today
      </button>{' '}
      |{' '}
      <button
        type="button"
        className={`as-non-button ${theme} ${
          viewSelected === View.NEXT_SEVEN_DAYS ? 'is-active' : ''
        }`}
        onClick={(): void => handleViewClick(View.NEXT_SEVEN_DAYS)}
      >
        Next 7 Days
      </button>{' '}
      |{' '}
      <button
        type="button"
        className={`as-non-button ${theme} ${
          viewSelected === View.ALL ? 'is-active' : ''
        }`}
        onClick={(): void => handleViewClick(View.ALL)}
      >
        All
      </button>{' '}
      |{' '}
      <button
        type="button"
        className={`as-non-button ${theme} ${
          viewSelected === View.COMPLETED ? 'is-active' : ''
        }`}
        onClick={(): void => handleViewClick(View.COMPLETED)}
      >
        Completed
      </button>
    </>
  );

  return (
    <div className="selector">
      <div className="selector__view">
        <p className="">
          <span>View:</span> {options}
        </p>
      </div>
      <div className="selector__tag">
        {!isKanban && (
          <button
            type="button"
            className={`as-non-button ${theme} ${
              searchType ? 'has-text-danger' : ''
            }`}
            onClick={handleSearchClick}
          >
            {/* eslint-disable-next-line no-nested-ternary */}
            {searchType ? (isMobile ? 'Cancel' : 'Cancel Search') : 'Search'}
          </button>
        )}
        {isKanban && (
          <div className={`dropdown is-right ${searchType ? 'is-active' : ''}`}>
            <div className="dropdown-trigger">
              <button
                className={`as-non-button ${theme} ${
                  searchType ? 'has-text-danger' : ''
                }`}
                aria-haspopup="true"
                aria-controls="dropdown-menu"
                type="button"
                onClick={handleSearchClick}
              >
                {/* eslint-disable-next-line no-nested-ternary */}
                {searchType
                  ? isMobile
                    ? 'Cancel'
                    : 'Cancel Search'
                  : 'Search'}
              </button>
            </div>
            <div
              className="dropdown-menu selector__dropdown"
              id="dropdown-menu"
              role="menu"
            >
              <div className="dropdown-content is-slightly-transparent selector__dropdown--content">
                <KanbanSearch />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewSelector;
