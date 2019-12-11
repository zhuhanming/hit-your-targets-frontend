import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CurrentUser from 'interfaces/CurrentUser';
import CurrentFilters from 'interfaces/CurrentFilters';

type CurrentMisc = CurrentUser & CurrentFilters;

let initialState: CurrentMisc = {
  user: null,
  filters: []
}

const misc = createSlice({
  name: 'misc',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<CurrentUser>) => {
      state.user = action.payload.user;
    },
    updateFilter: (state, action: PayloadAction<CurrentFilters>) => {
      state.filters = action.payload.filters;
    },
    clearUser: state => {
      state.user = null;
    },
    clearFilters: state => {
      state.filters = [];
    }
  }
})

export const {
  setUser,
  updateFilter,
  clearUser,
  clearFilters
} = misc.actions;

export default misc.reducer;