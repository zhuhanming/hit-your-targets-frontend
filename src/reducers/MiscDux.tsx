/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CurrentUser from 'interfaces/CurrentUser';
import CurrentFilters from 'interfaces/CurrentFilters';

export interface CurrentMisc extends CurrentFilters {
  user: CurrentUser;
  theme: string;
}

const initialState: CurrentMisc = {
  user: {
    name: null,
    email: null,
    displayImageUrl: null,
    lastRetrieved: null
  },
  filters: [],
  theme: ''
};

const misc = createSlice({
  name: 'misc',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<CurrentUser>) => {
      state.user = { ...action.payload };
    },
    updateFilter: (state, action: PayloadAction<CurrentFilters>) => {
      state.filters = action.payload.filters;
    },
    updateTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
    clearUser: state => {
      state.user = {
        name: null,
        email: null,
        displayImageUrl: null,
        lastRetrieved: null
      };
    },
    clearFilters: state => {
      state.filters = [];
    }
  }
});

export const {
  setUser,
  updateFilter,
  updateTheme,
  clearUser,
  clearFilters
} = misc.actions;

export default misc.reducer;
