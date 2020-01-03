/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useDispatch } from 'react-redux';

import { useView } from 'contexts/viewContext';
import { useSearch } from 'contexts/searchContext';
import { View } from 'interfaces/ViewContext';
import RootStateInterface from 'interfaces/RootState';
import {
  SearchType,
  setTitleString,
  setTags,
  setSearchLogic
} from 'reducers/SearchDux';

import './SearchBar.scss';

const SearchBar = () => {
  const { viewSelected } = useView();
  const { searchType, titleString } = useSearch();
  const dispatch = useDispatch();

  const placeholderText =
    viewSelected === View.COMPLETED
      ? 'Search through your completed tasks.'
      : 'Search through your current tasks.';

  const handleChange = e => {
    if (searchType === SearchType.TITLE) {
      dispatch(setTitleString(e.target.value));
    }
  };

  return (
    <form className="search-field">
      <div className="control">
        <input
          className="input is-info search-field__input"
          name="title"
          type="text"
          autoComplete="off"
          placeholder={placeholderText}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          onChange={handleChange}
          defaultValue={titleString}
        />
      </div>
    </form>
  );
};

export default SearchBar;
