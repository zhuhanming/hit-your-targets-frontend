/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CurrentUser from 'interfaces/CurrentUser';
import CurrentFilters from 'interfaces/CurrentFilters';

interface CurrentMisc extends CurrentFilters {
  user: CurrentUser;
}

const initialState: CurrentMisc = {
  user: {
    name: null,
    email: null,
    displayImageUrl: null,
    lastRetrieved: null
  },
  filters: []
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

export const { setUser, updateFilter, clearUser, clearFilters } = misc.actions;

export default misc.reducer;
