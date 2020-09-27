import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ThemeContextInterface from 'interfaces/ThemeContext';
import RootStateInterface from 'interfaces/RootState';
import { updateTheme, CurrentMisc } from 'reducers/MiscDux';

const defaultContextData = {
  theme: '',
  toggle: (): null => null,
};

const ThemeContext = React.createContext<ThemeContextInterface>(
  defaultContextData
);

// Manages light and dark theme of app - interacts with redux
const ThemeProvider: React.SFC = (props) => {
  const dispatch = useDispatch();
  const selectMisc = (state: RootStateInterface): CurrentMisc => state.misc;
  const { theme } = useSelector(selectMisc);

  const toggle = (): void => {
    dispatch(updateTheme(theme === '' ? 'dark' : ''));
  };

  return <ThemeContext.Provider value={{ theme, toggle }} {...props} />;
};

const useTheme = (): ThemeContextInterface => {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(`useTheme must be used within a ThemeProvider`);
  }
  return context;
};

export { ThemeProvider, useTheme };
