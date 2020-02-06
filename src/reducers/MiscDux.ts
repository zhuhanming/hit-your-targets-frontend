/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CurrentUser from 'interfaces/CurrentUser';
import { View } from 'interfaces/ViewContext';

export interface CurrentMisc {
  user: CurrentUser;
  theme: string;
  view: View;
}

const initialState: CurrentMisc = {
  user: {
    name: null,
    email: null,
    displayImageUrl: null,
    lastRetrieved: null,
    preferences: null
  },
  theme: '',
  view: View.TODAY
};

const misc = createSlice({
  name: 'misc',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<CurrentUser>): void => {
      state.user = { ...action.payload };
    },
    setView: (state, action: PayloadAction<View>): void => {
      state.view = action.payload;
    },
    updateTheme: (state, action: PayloadAction<string>): void => {
      state.theme = action.payload;
    },
    clearUser: (state): void => {
      state.user = {
        name: null,
        email: null,
        displayImageUrl: null,
        lastRetrieved: null,
        preferences: null
      };
    }
  }
});

export const { setUser, updateTheme, setView, clearUser } = misc.actions;

export default misc.reducer;