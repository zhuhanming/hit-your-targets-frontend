/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import { useDispatch } from 'react-redux';

import { useSearch } from 'contexts/searchContext';
import {
  SearchType,
  setSearch,
  SearchLogic,
  setSearchLogic,
  setTags
} from 'reducers/SearchDux';
import SearchBar from 'components/searchBar';

import './KanbanSearch.scss';

const KanbanSearch: React.SFC = () => {
  const dispatch = useDispatch();
  const { searchType, searchLogic, tags } = useSearch();

  const handleChangeSearch = (newSearchType: SearchType): void => {
    if (newSearchType !== searchType) {
      dispatch(setSearch(newSearchType));
    }
  };

  const handleChangeSearchLogic = (newSearchLogic: SearchLogic): void => {
    if (newSearchLogic !== searchLogic) {
      dispatch(setSearchLogic(newSearchLogic));
    }
  };

  const handleDeleteTag = (tagToRemove: string): void => {
    console.log(tagToRemove);
    let newTags = tags.slice();
    newTags = newTags.filter(t => t !== tagToRemove);
    dispatch(setTags(newTags));
  };

  return (
    <div className="kanban-search">
      <div className="kanban-search__type">
        <button
          className={`kanban-search__type--option as-non-button ${
            searchType === SearchType.TITLE ? '' : 'is-inactive'
          }`}
          type="button"
          onClick={(): void => handleChangeSearch(SearchType.TITLE)}
        >
          By Title
        </button>
        <button
          className={`kanban-search__type--option as-non-button ${
            searchType === SearchType.TAG ? '' : 'is-inactive'
          }`}
          type="button"
          onClick={(): void => handleChangeSearch(SearchType.TAG)}
        >
          By Tags
        </button>
      </div>
      {searchType === SearchType.TAG && (
        <p className="kanban-search__logic">
          <button
            className={`as-non-button ${
              searchLogic === SearchLogic.ALL ? 'is-active' : ''
            }`}
            type="button"
            onClick={() => handleChangeSearchLogic(SearchLogic.ALL)}
          >
            All
          </button>{' '}
          |{' '}
          <button
            className={`as-non-button ${
              searchLogic === SearchLogic.ANY ? 'is-active' : ''
            }`}
            type="button"
            onClick={() => handleChangeSearchLogic(SearchLogic.ANY)}
          >
            Any
          </button>
        </p>
      )}
      <div className="kanban-search__tags">
        {tags.map(t => (
          <div className="tag is-primary react-tagsinput-tag" key={`tag-${t}`}>
            {t}
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              className="react-tagsinput-remove"
              onClick={(): void => handleDeleteTag(t)}
              onKeyDown={(): void => handleDeleteTag(t)}
              role="button"
              tabIndex={0}
            />
          </div>
        ))}
      </div>
      <div className="kanban-search__entry">
        <SearchBar isKanban />
      </div>
    </div>
  );
};

export default KanbanSearch;
