import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ThemeContextInterface from 'interfaces/ThemeContext';
import RootStateInterface from 'interfaces/RootState';
import { updateTheme } from 'reducers/MiscDux';

const defaultContextData = {
  theme: '',
  toggle: () => null
};

const ThemeContext = React.createContext<ThemeContextInterface>(
  defaultContextData
);

const ThemeProvider = props => {
  const dispatch = useDispatch();
  const selectMisc = (state: RootStateInterface) => state.misc;
  const { theme } = useSelector(selectMisc);

  const toggle = () => {
    dispatch(updateTheme(theme === '' ? 'dark' : ''));
  };

  return <ThemeContext.Provider value={{ theme, toggle }} {...props} />;
};

const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(`useTheme must be used within a ThemeProvider`);
  }
  return context;
};

export { ThemeProvider, useTheme };
