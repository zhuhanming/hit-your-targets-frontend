/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TagsInput from 'react-tagsinput';
import { toast } from 'react-toastify';

import { useView } from 'contexts/viewContext';
import { useSearch } from 'contexts/searchContext';
import { View } from 'interfaces/ViewContext';
import { capitalize } from 'utils';
import {
  SearchType,
  setTitleString,
  setTags,
  setSearchLogic,
  setSearch,
  SearchLogic,
} from 'reducers/SearchDux';

import './SearchBar.scss';

interface SearchBarProps {
  isKanban?: boolean;
}

// SearchBar is only shown when search is active
// Replaces the TodoCreationField in List View
// Is in dropdown from ViewSelector/KanbanSearch in Kanban View
const SearchBar: React.SFC<SearchBarProps> = ({ isKanban = false }) => {
  const { viewSelected } = useView();
  const { searchType, titleString, tags, searchLogic } = useSearch();
  const dispatch = useDispatch();
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const placeholderText = isKanban
    ? 'Enter title here'
    : `Search through your ${
        viewSelected === View.COMPLETED ? 'completed' : 'current'
      } tasks by their titles.`;

  // Update the title currently being searched for
  const handleChange = (e: { target: HTMLInputElement }): void => {
    if (searchType === SearchType.TITLE) {
      dispatch(setTitleString(e.target.value));
    }
  };

  // Toggles between searching for title and searching for tags
  const handleChangeSearchType = (newSearchType: SearchType): void => {
    if (newSearchType !== searchType) dispatch(setSearch(newSearchType));
    setIsDropdownActive(false);
  };

  // Updates the tags currently being searched for
  const handleTagsInput = (newTags: string[]): void => {
    const newSearchTags = [...new Set(newTags.map(capitalize))];
    if (newSearchTags.length < newTags.length) {
      // Tag already being searched for
      toast.warn('That tag is already being searched for!');
    } else {
      dispatch(setTags(newSearchTags));
    }
  };

  // Toggles between searching for tasks with ALL tags and ANY of the tags
  const handleChangeSearchLogic = (newSearchLogic: SearchLogic): void => {
    if (newSearchLogic !== searchLogic) {
      dispatch(setSearchLogic(newSearchLogic));
    }
  };

  return (
    <form className="search-field">
      {/* SearchType dropdown on left of SearchBar - only for List View */}
      {!isKanban && (
        <div
          className={`dropdown search-field__dropdown ${
            isDropdownActive ? 'is-active' : ''
          }`}
        >
          <div className="dropdown-trigger">
            <button
              type="button"
              className="button search-field__dropdown__button"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
              onClick={(): void => setIsDropdownActive(!isDropdownActive)}
            >
              <span>
                {searchType === SearchType.TITLE ? 'By Title' : 'By Tags'}
              </span>
              <span className="icon is-small">
                <i className="fas fa-angle-down" aria-hidden="true" />
              </span>
            </button>
          </div>
          <div
            className="dropdown-menu search-field__dropdown__menu"
            id="dropdown-menu"
            role="menu"
          >
            <div className="dropdown-content search-field__dropdown__content">
              <button
                type="button"
                className={`dropdown-item search-field__dropdown__item ${
                  searchType === SearchType.TITLE ? 'is-active' : ''
                }`}
                onClick={(): void => handleChangeSearchType(SearchType.TITLE)}
              >
                By Title
              </button>
              <button
                type="button"
                className={`dropdown-item search-field__dropdown__item ${
                  searchType === SearchType.TAG ? 'is-active' : ''
                }`}
                onClick={(): void => handleChangeSearchType(SearchType.TAG)}
              >
                By Tags
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="control">
        {/* Search bar for Title search */}
        {searchType === SearchType.TITLE && (
          <input
            className={`input is-info search-field__input ${
              isKanban ? 'is-kanban' : ''
            }`}
            name="title"
            type="text"
            autoComplete="off"
            placeholder={placeholderText}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={!isKanban}
            onChange={handleChange}
            defaultValue={titleString}
          />
        )}
        {/* Customised search bar for Tags search */}
        {searchType === SearchType.TAG && (
          <div className={`tags-search ${isKanban ? 'is-kanban' : ''}`}>
            <TagsInput
              value={tags}
              onChange={handleTagsInput}
              tagProps={{
                className: `tag is-primary react-tagsinput-tag ${
                  isKanban ? 'is-kanban' : ''
                }`,
                classNameRemove: 'react-tagsinput-remove',
              }}
              inputProps={{
                className: 'react-tagsinput-input input tags-field',
                placeholder: `${
                  // eslint-disable-next-line no-nested-ternary
                  isKanban
                    ? 'Enter tag here'
                    : tags.length > 0
                    ? 'Add tag'
                    : `Search through your ${
                        viewSelected === View.COMPLETED
                          ? 'completed'
                          : 'current'
                      } tasks by their tags.`
                }`,
              }}
            />
            {/* Toggle for SearchLogic - only in List View */}
            {!isKanban && (
              <div className="tags-search__logic">
                <button
                  type="button"
                  className={`as-non-button is-size-7 ${
                    searchLogic === SearchLogic.ALL ? '' : 'is-light-grey'
                  }`}
                  onClick={(): void => handleChangeSearchLogic(SearchLogic.ALL)}
                >
                  All
                </button>
                <span className="tags-search__logic__sep is-light-grey">
                  {' '}
                  |{' '}
                </span>
                <button
                  type="button"
                  className={`as-non-button is-size-7 ${
                    searchLogic === SearchLogic.ANY ? '' : 'is-light-grey'
                  }`}
                  onClick={(): void => handleChangeSearchLogic(SearchLogic.ANY)}
                >
                  Any
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
