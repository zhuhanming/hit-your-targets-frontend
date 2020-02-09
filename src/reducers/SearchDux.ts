/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum SearchType {
  TITLE = 'TITLE',
  TAG = 'TAG'
}

export enum SearchLogic {
  ALL = 'ALL',
  ANY = 'ANY'
}

export interface CurrentSearch {
  searchType: SearchType | null;
  titleString: string;
  tags: string[];
  searchLogic: SearchLogic;
}

const initialState: CurrentSearch = {
  searchType: null,
  titleString: '',
  tags: [],
  searchLogic: SearchLogic.ALL
};

// Contains current SearchType, title being searched, tags being searched, and the logic for tag searching
const search = createSlice({
  name: 'search',
  initialState,
  reducers: {
    startSearch: (state): void => {
      if (!state.searchType) state.searchType = SearchType.TITLE;
    },
    // Clears all info for search
    cancelSearch: (state): void => {
      if (state.searchType) {
        state.searchType = null;
        state.titleString = '';
        state.tags = [];
      }
    },
    setSearch: (state, action: PayloadAction<SearchType>): void => {
      state.searchType = action.payload;
    },
    setTitleString: (state, action: PayloadAction<string>): void => {
      state.titleString = action.payload;
    },
    setTags: (state, action: PayloadAction<string[]>): void => {
      state.tags = action.payload;
    },
    setSearchLogic: (state, action: PayloadAction<SearchLogic>): void => {
      state.searchLogic = action.payload;
    }
  }
});

export const {
  startSearch,
  cancelSearch,
  setSearch,
  setTitleString,
  setTags,
  setSearchLogic
} = search.actions;

export default search.reducer;
