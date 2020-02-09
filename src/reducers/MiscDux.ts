/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CurrentUser from 'interfaces/CurrentUser';
import { View } from 'interfaces/ViewContext';
import CurrentFunFact from 'interfaces/CurrentFunFact';

export interface CurrentMisc {
  user: CurrentUser;
  theme: string;
  view: View;
  funFact: CurrentFunFact;
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
  view: View.TODAY,
  funFact: {
    fact: null,
    lastUpdated: null
  }
};

// Contains user information, theme, view selected and fun fact of the day
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
    setFunFact: (state, action: PayloadAction<CurrentFunFact>): void => {
      state.funFact = action.payload;
    },
    clearUser: (state): void => {
      state.user = {
        name: null,
        email: null,
        displayImageUrl: null,
        lastRetrieved: null,
        preferences: null
      };

      state.funFact = {
        fact: null,
        lastUpdated: null
      };
    }
  }
});

export const {
  setUser,
  updateTheme,
  setView,
  setFunFact,
  clearUser
} = misc.actions;

export default misc.reducer;
