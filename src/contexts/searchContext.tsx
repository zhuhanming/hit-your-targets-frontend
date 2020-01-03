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
      return todos.filter(
        todo =>
          todo.title.toLowerCase().indexOf(titleString.toLowerCase()) !== -1
      );
    }
    if (searchType === SearchType.TAG) {
      if (tags.length === 0) return todos;
      if (searchLogic === SearchLogic.ALL) {
        return todos.filter(todo =>
          tags.every(tag => todo.tags.indexOf(tag) >= 0)
        );
      }
      if (searchLogic === SearchLogic.ANY) {
        return todos.filter(todo =>
          todo.tags.some(tag => tags.indexOf(tag) >= 0)
        );
      }
    }
    return todos;
  };

  return (
    <SearchContext.Provider
      value={{ searchType, getFilteredTodos, titleString, tags, searchLogic }}
      {...props}
    />
  );
};

const useSearch = () => {
  const context = React.useContext(SearchContext);
  if (context === undefined) {
    throw new Error(`useSearch must be used within a SearchProvider`);
  }
  return context;
};

export { SearchProvider, useSearch };
