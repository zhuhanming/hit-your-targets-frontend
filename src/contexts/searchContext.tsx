import React from 'react';
import { useSelector } from 'react-redux';

import SearchContextInterface from 'interfaces/SearchContext';
import RootStateInterface from 'interfaces/RootState';
import ToDo from 'interfaces/ToDo';
import { SearchType, SearchLogic } from 'reducers/SearchDux';

const SearchContext = React.createContext<SearchContextInterface | undefined>(
  undefined
);

const SearchProvider = props => {
  const selectSearch = (state: RootStateInterface) => state.search;
  const { searchType, titleString, tags, searchLogic } = useSelector(
    selectSearch
  );

  const getFilteredTodos = (todos: ToDo[]) => {
    if (searchType === SearchType.TITLE) {
      if (titleString === '') return todos;
    } else if (searchType === SearchType.TAG) {
      if (tags.length === 0) return todos;
    } else {
      return todos;
    }
    return todos;
  };

  return <SearchContext.Provider value={{ getFilteredTodos }} {...props} />;
};

const useSearch = () => {
  const context = React.useContext(SearchContext);
  if (context === undefined) {
    throw new Error(`useSearch must be used within a SearchProvider`);
  }
  return context;
};

export { SearchProvider, useSearch };
